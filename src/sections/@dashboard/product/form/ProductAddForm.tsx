import React, { useCallback, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
  RHFUploadSingleFile,
} from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Alert, Stack } from '@mui/material';
import { useDispatch } from '../../../../redux/store';
import { CreateProductSchema } from 'src/@types/product';
import { createProduct, searchProduct } from 'src/redux/slices/product';
import { debugError } from 'src/utils/foundation';
import CategoryForm from './CategoryForm';

type FormValuesProps = CreateProductSchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};

export default function ProductAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    onHandMin: Yup.number()
      .min(0, 'On Hand Min must be in range 0 - 1000000')
      .max(1000000, 'On Hand Min must be in range 0 - 1000000'),
    onHandMax: Yup.number()
      .min(0, 'On Hand Max must be in range 0 - 1000000')
      .max(1000000, 'On Hand Max must be in range 0 - 1000000'),
    categories: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().required('ID is required'),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      onHandMin: 0,
      onHandMax: 0,
      image: '',
      categories: [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(YupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    const data = {
      ...values,
      categories: values.categories,
    };

    try {
      await dispatch(createProduct(data));
      enqueueSnackbar('Create Product success!');
      if (onSuccess) {
        onSuccess();
      }
      await dispatch(searchProduct({}));
    } catch (error) {
      debugError(error);
      setError('afterSubmit', { message: error.message || error });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="name" label="Name" autoFocus />
        <RHFTextField name="description" label="Description" />
        <RHFTextField name="onHandMin" label="On Hand Min" type="number" />
        <RHFTextField name="onHandMax" label="On Hand Max" type="number" />
        <CategoryForm />
        <RHFUploadAvatar name="image" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
