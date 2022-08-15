import { DatePicker } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import RHFFetch from 'src/components/hook-form/RHFFetch';

export default function DeliveryVoucherNewEditMaster() {
  const { control } = useFormContext();

  return (
    <Stack spacing={2} direction="column" sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name="reportingDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Ngày báo cáo"
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
        <RHFFetch
          name="customer"
          label="Khách hàng"
          endpoint="/customer/fetch"
          sx={{ width: '500px' }}
        />
      </Stack>
      <Stack>
        <RHFTextField name="description" label="Mô tả" />
      </Stack>
    </Stack>
  );
}
