import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { CreateWarehouseSchema } from 'src/@types/warehouse';
import { searchWarehouse, createWarehouse } from 'src/redux/slices/warehouse';
import { debugError } from 'src/utils/foundation';

type FormValuesProps = CreateWarehouseSchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};

export default function WarehouseAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      address: '',
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

  const onSubmit = async (value: CreateWarehouseSchema) => {
    const data = {
      ...value,
    };

    try {
      await dispatch(createWarehouse(data));
      enqueueSnackbar('Create warehouse success!');
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
        <RHFTextField name="name" label="Name" autoFocus />
        <RHFTextField name="address" label="Address" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Create
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
