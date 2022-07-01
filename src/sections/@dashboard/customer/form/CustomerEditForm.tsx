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
import { UpdateCustomerSchema } from 'src/@types/customer';
import { phoneRegExp } from 'src/utils/regexPattern';
import { searchCustomer, updateCustomer, hasError } from 'src/redux/slices/customer';
import { GENDER_OPTION } from 'src/utils/constants';
import NetworkAutocomplete from 'src/components/hook-form/NetworkAutocomplete';
import { debugError } from 'src/utils/foundation';
// @types
// components

// ----------------------------------------------------------------------

type FormValuesProps = UpdateCustomerSchema & {
  afterSubmit?: string;
};

type Props = {
  payload: UpdateCustomerSchema;
  onSuccess?: Function;
};

export default function CustomerEditForm({ payload, onSuccess }: Props) {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.customer);

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is required'),
    email: Yup.string().email().required('Email is required'),
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: payload.name || '',
      address: payload.address || '',
      phone: payload.phone || '',
      email: payload.email || '',
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

  const onSubmit = async (value: UpdateCustomerSchema) => {
    const data = {
      ...value,
      id: payload.id,
    };

    try {
      await dispatch(updateCustomer(data));
      enqueueSnackbar('Update success!');
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
        {error && <Alert severity="error">{error}</Alert>}
        <RHFTextField name="name" label="Name" autoFocus />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="phone" label="Phone" />
        <RHFTextField name="address" label="Address" />
        <RHFTextField name="description" label="Description" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
