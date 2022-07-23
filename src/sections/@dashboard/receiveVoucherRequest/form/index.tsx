import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ReceiveVoucherRequest,
  ReceiveVoucherRequestDetail,
  CreateReceiveVoucherRequestSchema,
  UpdateReceiveVoucherRequestSchema,
} from 'src/@types/vouchers/receiveVoucherRequest';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'src/components/hook-form';
import { Alert, Card, Stack } from '@mui/material';
import ReceiveVoucherRequestNewEditMaster from './ReceiveVoucherRequestNewEditMaster';
import { LoadingButton } from '@mui/lab';
import ReceiveVoucherRequestNewEditDetails from './ReceiveVoucherRequestNewEditDetails';
import { FetchModel } from 'src/@types/generic';
import { DEFAULT_ERROR } from 'src/utils/constants';
import {
  createReceiveVoucherRequest,
  getReceiveVoucherRequest,
  updateReceiveVoucherRequest,
} from 'src/redux/slices/receiveVoucherRequest';
import { dispatch } from 'src/redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from 'src/routes/paths';

type IFormValuesProps = Omit<ReceiveVoucherRequest, 'id' | 'code' | 'warehouse' | 'details'>;

interface FormValuesProps extends IFormValuesProps {
  afterSubmit?: string;
  details: { quantity: number; product: FetchModel | null }[];
}

type Props = {
  isEdit?: boolean;
  currentVoucher?: ReceiveVoucherRequest;
};

export default function ReceiveVoucherRequestNewEditForm({ currentVoucher, isEdit }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewVoucherSchema = Yup.object().shape({
    reportingDate: Yup.date().required('Reporting Date is required'),
    details: Yup.array().of(
      Yup.object().shape({
        product: Yup.object().required('Proudct is required'),
        quantity: Yup.number().min(1, 'Min 1'),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      reportingDate: currentVoucher?.reportingDate || new Date(),
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
        const newVoucher: CreateReceiveVoucherRequestSchema = {
          ...values,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        console.log(newVoucher);

        result = await dispatch(createReceiveVoucherRequest(newVoucher));
      } else {
        const newVoucher: UpdateReceiveVoucherRequestSchema = {
          id: currentVoucher!.id,
          ...values,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        console.log(newVoucher);

        result = await dispatch(updateReceiveVoucherRequest(newVoucher));
      }
      unwrapResult(result);
      enqueueSnackbar((isEdit ? 'Update' : 'Create') + ' voucher success!');
      if (!isEdit) {
        navigate(PATH_DASHBOARD.receiveVoucherRequest.list);
      } else {
        await dispatch(getReceiveVoucherRequest({ id: currentVoucher!.id }));
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Card>
        <ReceiveVoucherRequestNewEditMaster />
        <ReceiveVoucherRequestNewEditDetails />
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
