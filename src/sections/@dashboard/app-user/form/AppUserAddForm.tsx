import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
} from '../../../../components/hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
// redux
import { useDispatch } from '../../../../redux/store';
// routes
import { CreateAppUserSchema, ENUM_GENDER } from 'src/@types/appUser';
import { phoneRegExp } from 'src/utils/regexPattern';
import { searchAppUser, createAppUser } from 'src/redux/slices/appUser';
import { DEFAULT_ERROR, GENDER_OPTION } from 'src/utils/constants';
import NetworkAutocomplete from 'src/components/hook-form/NetworkAutocomplete';
import { unwrapResult } from '@reduxjs/toolkit';
// @types
// components

// ----------------------------------------------------------------------

type FormValuesProps = CreateAppUserSchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};

export default function AppUserAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    username: Yup.string().required('Tên tài khoản là trường bắt buộc'),
    email: Yup.string().email().required('Email là trường bắt buộc'),
    firstName: Yup.string().required('Họ là trường bắt buộc'),
    lastName: Yup.string().required('Tên là trường bắt buộc'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Số điện thoại không khả dụng')
      .required('Số điện thoại là trường bắt buộc'),
  });

  const defaultValues = useMemo(
    () => ({
      username: 'test',
      email: 'test@gmail.com',
      firstName: 'hoang',
      lastName: 'nguyen',
      phoneNumber: '123123123',
      gender: ENUM_GENDER.MALE,
      inWarehouse: null,
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

  const onSubmit = async (value: CreateAppUserSchema) => {
    const data = {
      ...value,
    };

    try {
      const result = await dispatch(createAppUser(data));
      unwrapResult(result);
      enqueueSnackbar('Tạo người dùng thành công!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="username" label="Tên tài khoản" autoFocus />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="firstName" label="Họ" />
        <RHFTextField name="lastName" label="Tên" />
        <RHFTextField name="phoneNumber" label="Số điện thoại" />
        <RHFRadioGroup
          name="gender"
          options={GENDER_OPTION}
          sx={{
            '& .MuiFormControlLabel-root': { mr: 4 },
          }}
        />
        <NetworkAutocomplete
          name="inWarehouse"
          label="Kho"
          endpoint="/warehouse/fetch"
          sx={{ width: '100%' }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Tạo
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
