import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  DeliveryRequest,
  DeliveryRequestDetail,
  CreateDeliveryRequestSchema,
  UpdateDeliveryRequestSchema,
} from 'src/@types/vouchers/deliveryRequest';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'src/components/hook-form';
import { Alert, Card, Stack } from '@mui/material';
import DeliveryRequestNewEditMaster from './DeliveryRequestNewEditMaster';
import { LoadingButton } from '@mui/lab';
import DeliveryRequestNewEditDetails from './DeliveryRequestNewEditDetails';
import { FetchModel } from 'src/@types/generic';
import { DEFAULT_ERROR } from 'src/utils/constants';
import {
  createDeliveryRequest,
  getDeliveryRequest,
  updateDeliveryRequest,
} from 'src/redux/slices/deliveryRequest';
import { dispatch } from 'src/redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from 'src/routes/paths';

type IFormValuesProps = Omit<DeliveryRequest, 'id' | 'code' | 'warehouse' | 'details' | 'customer'>;

interface FormValuesProps extends IFormValuesProps {
  afterSubmit?: string;
  details: { quantity: number; product: FetchModel | null }[];
  customer: FetchModel | null;
}

type Props = {
  isEdit?: boolean;
  currentVoucher?: DeliveryRequest;
};

export default function DeliveryRequestNewEditForm({ currentVoucher, isEdit }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewVoucherSchema = Yup.object().shape({
    reportingDate: Yup.date().required('Reporting Date is required'),
    customer: Yup.object().required('Customer is required').nullable(),
    details: Yup.array().of(
      Yup.object().shape({
        product: Yup.object().required('Proudct is required').nullable(),
        quantity: Yup.number().min(1, 'Min 1'),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      reportingDate: currentVoucher?.reportingDate || new Date(),
      customer: currentVoucher?.customer || null,
      details: currentVoucher?.details || [],
      description: currentVoucher?.description || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVoucher]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewVoucherSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentVoucher) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVoucher]);

  const onSubmit = async () => {
    try {
      let result;
      if (!isEdit) {
        const newVoucher: CreateDeliveryRequestSchema = {
          ...values,
          customerId: values.customer!.id,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        console.log(newVoucher);

        result = await dispatch(createDeliveryRequest(newVoucher));
      } else {
        const newVoucher: UpdateDeliveryRequestSchema = {
          id: currentVoucher!.id,
          ...values,
          customerId: values.customer!.id,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        console.log(newVoucher);

        result = await dispatch(updateDeliveryRequest(newVoucher));
      }
      unwrapResult(result);
      enqueueSnackbar((isEdit ? 'Update' : 'Create') + ' voucher success!');
      if (!isEdit) {
        navigate(PATH_DASHBOARD.deliveryRequest.list);
      } else {
        await dispatch(getDeliveryRequest({ id: currentVoucher!.id }));
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Card>
        <DeliveryRequestNewEditMaster />
        <DeliveryRequestNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isEdit ? 'Update' : 'Create'} Voucher
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
