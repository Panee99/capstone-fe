import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
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
import RHFSelect from '../../../../components/hook-form/RHFSelect';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { UpdateAppUserSchema } from 'src/@types/appUser';
import { phoneRegExp } from 'src/utils/regexPattern';
import { searchAppUser, updateAppUser } from 'src/redux/slices/appUser';
import { DEFAULT_ERROR, GENDER_OPTION } from 'src/utils/constants';
import NetworkAutocomplete from 'src/components/hook-form/NetworkAutocomplete';
import { debugError } from 'src/utils/foundation';
import { unwrapResult } from '@reduxjs/toolkit';
// @types
// components

// ----------------------------------------------------------------------

type FormValuesProps = UpdateAppUserSchema & {
  afterSubmit?: string;
};

type Props = {
  payload: UpdateAppUserSchema;
  onSuccess?: Function;
};

export default function AppUserEditForm({ payload, onSuccess }: Props) {
  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('First name is required'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
  });

  const defaultValues = useMemo(
    () => ({
      email: payload.email || '',
      firstName: payload.firstName || '',
      lastName: payload.lastName || '',
      phoneNumber: payload.phoneNumber || '',
      gender: payload.gender || '',
      isActive: payload.isActive,
      inWarehouse: payload.inWarehouse,
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

  const onSubmit = async (value: UpdateAppUserSchema) => {
    const data = {
      ...value,
      id: payload.id,
    };

    try {
      const result = await dispatch(updateAppUser(data));
      unwrapResult(result);
      enqueueSnackbar('Update success!');
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
        <RHFSwitch
          name="isActive"
          label="Active"
          labelPlacement="start"
          style={{ alignSelf: 'start' }}
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
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
