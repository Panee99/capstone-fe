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
import { UpdateWarehouseSchema } from 'src/@types/warehouse';
import { searchWarehouse, updateWarehouse } from 'src/redux/slices/warehouse';
import { debugError } from 'src/utils/foundation';

type FormValuesProps = UpdateWarehouseSchema & {
  afterSubmit?: string;
};

type Props = {
  payload: UpdateWarehouseSchema;
  onSuccess?: Function;
};

export default function WarehouseEditForm({ payload, onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Tên là trường bắt buộc'),
    address: Yup.string().required('Địa chỉ là trường bắt buộc'),
  });

  const defaultValues = useMemo(
    () => ({
      name: payload.name || '',
      address: payload.address || '',
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

  const onSubmit = async (value: UpdateWarehouseSchema) => {
    const data = {
      ...value,
      id: payload.id,
    };

    try {
      await dispatch(updateWarehouse(data));
      enqueueSnackbar('Chỉnh sửa thành công!');
      if (onSuccess) {
        onSuccess();
      }
      await dispatch(searchWarehouse({}));
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
        <RHFTextField name="address" label="Địa chỉ" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Lưu thay đổi
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
