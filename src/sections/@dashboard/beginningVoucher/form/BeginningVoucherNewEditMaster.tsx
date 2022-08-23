import { DatePicker } from '@mui/lab';
import { Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';

export default function BeginningVoucherNewEditMaster() {
  const { control } = useFormContext();

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
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

      <RHFTextField name="description" label="Mô tả" />
    </Stack>
  );
}
