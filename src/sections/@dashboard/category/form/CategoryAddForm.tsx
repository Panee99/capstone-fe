import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { CreateCategorySchema } from 'src/@types/category';
import { searchCategory, createCategory } from 'src/redux/slices/category';
import { debugError } from 'src/utils/foundation';

type FormValuesProps = CreateCategorySchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};

export default function CategoryAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Tên là trường bắt buộc'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
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

  const onSubmit = async (value: CreateCategorySchema) => {
    const data = {
      ...value,
    };

    try {
      await dispatch(createCategory(data));
      enqueueSnackbar('Tạo loại sản phẩm thành công!');
      if (onSuccess) {
        onSuccess();
      }
      await dispatch(searchCategory({}));
    } catch (error) {
      debugError(error);
      setError('afterSubmit', { message: error.message || error });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="name" label="Tên" autoFocus />
        <RHFTextField name="description" label="Mô tả" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Tạo
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
