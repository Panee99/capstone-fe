import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '../../../../components/hook-form';
import { Stack, Card, TextField } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import { UpdateBeginningVoucherSchema } from 'src/@types/vouchers/beginningVoucher';
import { DatePicker } from '@mui/lab';

type FormValuesProps = UpdateBeginningVoucherSchema & {
  afterSubmit?: string;
};

type Props = {
  payload?: UpdateBeginningVoucherSchema;
  isEdit?: boolean;
  onSuccess?: Function;
};

export default function BeginningVoucherEditForm({ payload, onSuccess, isEdit }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    reportingDate: Yup.date().required('Ngày báo cáo là trường bắt buộc'),
    details: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .required('Số lượng là trường bắt buộc')
          .typeError('Số lượng phải là số')
          .min(1, 'Số lượng phải lớn hơn 0'),
        product: Yup.object().required('Sản phẩm là trường bắt buộc'),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      reportingDate: payload?.reportingDate || new Date(),
      details: payload?.details || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(YupSchema),
    defaultValues,
    mode: 'onChange',
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

  const onSubmit = async (value: UpdateBeginningVoucherSchema) => {
    console.log(JSON.stringify(value));

    // const data = {
    //   ...value,
    //   id: payload.id,
    // };

    // try {
    //   await dispatch(updateBeginningVoucher(data));
    //   enqueueSnackbar('Update success!');
    //   if (onSuccess) {
    //     onSuccess();
    //   }
    //   await dispatch(searchBeginningVoucher({}));
    // } catch (error) {
    //   debugError(error);
    //   setError('afterSubmit', { message: error.message || error });
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ mb: 1 }}>
        <Stack sx={{ px: 3, paddingBottom: 1 }}>
          <Controller
            name="orderDate"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                inputFormat="dd/MM/yyyy"
                label="Ngày đặt"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                )}
              />
            )}
          />
        </Stack>
      </Card>
    </FormProvider>
  );
}
