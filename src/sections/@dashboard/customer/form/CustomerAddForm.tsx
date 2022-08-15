import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { CreateCustomerSchema } from 'src/@types/customer';
import { phoneRegExp } from 'src/utils/regexPattern';
import { searchCustomer, createCustomer } from 'src/redux/slices/customer';
import { debugError } from 'src/utils/foundation';

type FormValuesProps = CreateCustomerSchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};

export default function CustomerAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Tên là trường bắt buộc'),
    address: Yup.string().required('Địa chỉ là trường bắt buộc'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .required('Số điện thoại là trường bắt buộc'),
    email: Yup.string().email().required('Email là trường bắt buộc'),
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      address: '',
      phone: '',
      email: '',
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
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (value: CreateCustomerSchema) => {
    const data = {
      ...value,
    };

    try {
      await dispatch(createCustomer(data));
      enqueueSnackbar('Tạo khách hàng thành công!');
      if (onSuccess) {
        onSuccess();
      }
      await dispatch(searchCustomer({}));
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
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="phone" label="Số điện thoại" />
        <RHFTextField name="address" label="Địa chỉ" />
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
