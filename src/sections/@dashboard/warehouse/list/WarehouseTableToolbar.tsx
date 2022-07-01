import { Stack, InputAdornment, TextField } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  filterKeyword: string;
  onFilterKeyword: (value: string) => void;
};

export default function WarehouseTableToolbar({ filterKeyword, onFilterKeyword }: Props) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        value={filterKeyword}
        onChange={(event) => onFilterKeyword(event.target.value)}
        placeholder="Search keyword"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
