import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  BeginningVoucher,
  BeginningVoucherDetail,
  CreateBeginningVoucherSchema,
  UpdateBeginningVoucherSchema,
} from 'src/@types/vouchers/beginningVoucher';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from 'src/components/hook-form';
import { Alert, Card, Stack } from '@mui/material';
import BeginningVoucherNewEditMaster from './BeginningVoucherNewEditMaster';
import { LoadingButton } from '@mui/lab';
import BeginningVoucherNewEditDetails from './BeginningVoucherNewEditDetails';
import { FetchModel } from 'src/@types/generic';
import { DEFAULT_ERROR } from 'src/utils/constants';
import {
  createBeginningVoucher,
  getBeginningVoucher,
  updateBeginningVoucher,
} from 'src/redux/slices/beginningVoucher';
import { dispatch } from 'src/redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from 'src/routes/paths';

type IFormValuesProps = Omit<BeginningVoucher, 'id' | 'code' | 'warehouse' | 'details'>;

interface FormValuesProps extends IFormValuesProps {
  afterSubmit?: string;
  details: { quantity: number; product: FetchModel | null }[];
}

type Props = {
  isEdit?: boolean;
  currentVoucher?: BeginningVoucher;
};

export default function BeginningNewEditForm({ currentVoucher, isEdit }: Props) {
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
        const newVoucher: CreateBeginningVoucherSchema = {
          ...values,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        result = await dispatch(createBeginningVoucher(newVoucher));
      } else {
        const newVoucher: UpdateBeginningVoucherSchema = {
          id: currentVoucher!.id,
          ...values,
          details: values.details.map((detail) => ({
            productId: detail.product!.id,
            quantity: detail.quantity,
          })),
        };
        result = await dispatch(updateBeginningVoucher(newVoucher));
      }
      unwrapResult(result);

      enqueueSnackbar((isEdit ? 'Update' : 'Create') + ' user success!');
      if (!isEdit) {
        navigate(PATH_DASHBOARD.beginningVoucher.list);
      } else {
        await dispatch(getBeginningVoucher({ id: currentVoucher!.id }));
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Card>
        <BeginningVoucherNewEditMaster />
        <BeginningVoucherNewEditDetails />
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
