import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { UpdateCategorySchema } from 'src/@types/category';
import { searchCategory, updateCategory } from 'src/redux/slices/category';
import { debugError } from 'src/utils/foundation';

type FormValuesProps = UpdateCategorySchema & {
  afterSubmit?: string;
};

type Props = {
  payload: UpdateCategorySchema;
  onSuccess?: Function;
};

export default function CategoryEditForm({ payload, onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Tên là trường bắt buộc'),
  });

  const defaultValues = useMemo(
    () => ({
      name: payload.name || '',
      description: payload.description || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(YupSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  const onSubmit = async (value: UpdateCategorySchema) => {
    const data = {
      ...value,
      id: payload.id,
    };

    try {
      await dispatch(updateCategory(data));
      enqueueSnackbar('Chỉnh sửa thành công!');
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
        <RHFTextField name="name" label="Tên" />
        <RHFTextField name="description" label="Mô tả" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Lưu thay đổi
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
