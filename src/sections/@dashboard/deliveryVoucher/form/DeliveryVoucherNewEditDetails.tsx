import { Box, Button, Divider, InputAdornment, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import NetworkAutocomplete from 'src/components/hook-form/NetworkAutocomplete';
import RHFFetch from 'src/components/hook-form/RHFFetch';
import Iconify from 'src/components/Iconify';
import { fNumber } from 'src/utils/formatNumber';

export default function DeliveryVoucherNewEditDetails() {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });
  const values = watch();
  const handleAdd = () => {
    append({
      product: null,
      quantity: 0,
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Chi tiết:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFFetch
                name={`details[${index}].product`}
                label="Sản phẩm"
                size="small"
                endpoint="/product/fetch"
                sx={{ width: '500px' }}
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`details[${index}].quantity`}
                label="Số lượng"
                onChange={(event) =>
                  setValue(`details[${index}].quantity`, Number(event.target.value))
                }
                sx={{ maxWidth: { md: 96 } }}
                InputLabelProps={{ shrink: true }}
              />

              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="eva:trash-2-outline" />}
                onClick={() => handleRemove(index)}
              >
                Xóa
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Thêm chi tiết
        </Button>
      </Stack>
    </Box>
  );
}
