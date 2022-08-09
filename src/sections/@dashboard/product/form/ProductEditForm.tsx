import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert, Typography } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { UpdateProductSchema } from 'src/@types/product';
import { searchProduct, updateProduct } from 'src/redux/slices/product';
import { debugError } from 'src/utils/foundation';
import Barcode from 'src/components/barcode';

type FormValuesProps = UpdateProductSchema & {
  afterSubmit?: string;
};

type Props = {
  payload: UpdateProductSchema;
  onSuccess?: Function;
};

export default function ProductEditForm({ payload, onSuccess }: Props) {
  const dispatch = useDispatch();

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
      name: payload.name || '',
      description: payload.description || '',
      onHandMin: payload.onHandMin || 0,
      onHandMax: payload.onHandMax || 0,
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

  const onSubmit = async (value: UpdateProductSchema) => {
    const data = {
      ...value,
      id: payload.id,
    };

    try {
      await dispatch(updateProduct(data));
      enqueueSnackbar('Update success!');
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
        <Typography>{payload.code}</Typography>
        <RHFTextField name="name" label="Name" autoFocus />
        <RHFTextField name="description" label="Description" />
        <RHFTextField name="onHandMin" label="On Hand Min" type="number" />
        <RHFTextField name="onHandMax" label="On Hand Max" type="number" />
        <Barcode value={payload.code} style={{ width: 200, margin: '30px auto' }} />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
