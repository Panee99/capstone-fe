import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  DeliveryVoucher,
  CreateDeliveryVoucherSchema,
  UpdateDeliveryVoucherSchema,
} from 'src/@types/vouchers/deliveryVoucher';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'src/components/hook-form';
import { Alert, Card, Stack } from '@mui/material';
import DeliveryVoucherNewEditMaster from './DeliveryVoucherNewEditMaster';
import { LoadingButton } from '@mui/lab';
import DeliveryVoucherNewEditDetails from './DeliveryVoucherNewEditDetails';
import { FetchModel } from 'src/@types/generic';
import { DEFAULT_ERROR } from 'src/utils/constants';
import {
  createDeliveryVoucher,
  getDeliveryVoucher,
  updateDeliveryVoucher,
} from 'src/redux/slices/deliveryVoucher';
import { dispatch } from 'src/redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from 'src/routes/paths';
import axios from '../../../../utils/axios';
import { ReceiveVoucherRequestDetail } from 'src/@types/vouchers/receiveVoucherRequest';

type IFormValuesProps = Omit<DeliveryVoucher, 'id' | 'code' | 'warehouse' | 'details' | 'customer'>;

interface FormValuesProps extends IFormValuesProps {
  afterSubmit?: string;
  details: { quantity: number; product: FetchModel | null }[];
  customer: FetchModel | null;
}

type Props = {
  isEdit?: boolean;
  currentVoucher?: DeliveryVoucher;
};

export default function DeliveryVoucherNewEditForm({ currentVoucher, isEdit }: Props) {
  const navigate = useNavigate();
  const { id: requestId } = useParams();
  const [fetchError, setFetchError] = useState(null);

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
    const fetchRequestDetails = async () => {
      try {
        const res = await axios.get('/delivery-request-voucher/details', {
          params: { id: requestId },
        });
        reset({ ...defaultValues, details: res.data });
      } catch (error) {
        setFetchError(error?.message || error || DEFAULT_ERROR);
      }
    };

    if (isEdit && currentVoucher) {
      reset(defaultValues);
    }
    if (!isEdit) {
      fetchRequestDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVoucher]);

  const onSubmit = async () => {
    try {
      let result;
      if (!isEdit) {
        const newVoucher: CreateDeliveryVoucherSchema = {
          ...values,
          customerId: values.customer!.id,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        console.log(newVoucher);

        result = await dispatch(createDeliveryVoucher(newVoucher));
      } else {
        const newVoucher: UpdateDeliveryVoucherSchema = {
          id: currentVoucher!.id,
          ...values,
          customerId: values.customer!.id,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        console.log(newVoucher);

        result = await dispatch(updateDeliveryVoucher(newVoucher));
      }
      unwrapResult(result);
      enqueueSnackbar((isEdit ? 'Update' : 'Create') + ' voucher success!');
      if (!isEdit) {
        navigate(PATH_DASHBOARD.deliveryVoucher.list);
      } else {
        await dispatch(getDeliveryVoucher({ id: currentVoucher!.id }));
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods}>
      {!!fetchError && <Alert severity="error">{fetchError}</Alert>}
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Card>
        <DeliveryVoucherNewEditMaster />
        <DeliveryVoucherNewEditDetails />
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
