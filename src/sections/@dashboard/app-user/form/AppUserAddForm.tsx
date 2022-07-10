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
    username: Yup.string().required('Username is required'),
    email: Yup.string().email().required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('First name is required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
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
      enqueueSnackbar('Create user success!');
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
        <RHFTextField name="username" label="Username" autoFocus />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="firstName" label="firstName" />
        <RHFTextField name="lastName" label="lastName" />
        <RHFTextField name="phoneNumber" label="phoneNumber" />
        <RHFRadioGroup
          name="gender"
          options={GENDER_OPTION}
          sx={{
            '& .MuiFormControlLabel-root': { mr: 4 },
          }}
        />
        <NetworkAutocomplete
          name="inWarehouse"
          label="Warehouse"
          endpoint="/warehouse/fetch"
          sx={{ width: '100%' }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
