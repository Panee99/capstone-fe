import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { CreateProductSchema } from 'src/@types/product';
import { searchProduct, createProduct } from 'src/redux/slices/product';
import { debugError } from 'src/utils/foundation';

type FormValuesProps = CreateProductSchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};

export default function ProductAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.product);

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    onHandMin: Yup.number()
      .min(0, 'On Hand Min must be in range 0 - 1000000')
      .max(1000000, 'On Hand Min must be in range 0 - 1000000'),
    onHandMax: Yup.number()
      .min(0, 'On Hand Max must be in range 0 - 1000000')
      .max(1000000, 'On Hand Max must be in range 0 - 1000000'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      onHandMin: 0,
      onHandMax: 0,
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
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (value: CreateProductSchema) => {
    const data = {
      ...value,
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <RHFTextField name="name" label="Name" autoFocus />
        <RHFTextField name="description" label="Description" />
        <RHFTextField name="onHandMin" label="On Hand Min" type="number" />
        <RHFTextField name="onHandMax" label="On Hand Max" type="number" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
