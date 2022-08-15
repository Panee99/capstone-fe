import { useState } from 'react';
import { Checkbox, TableRow, TableCell, MenuItem, Typography, useTheme } from '@mui/material';
import { DeliveryVoucher, DeliveryVoucherStatus } from 'src/@types/vouchers/deliveryVoucher';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { fDate } from 'src/utils/formatTime';
import Label, { LabelColor } from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  row: DeliveryVoucher;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function DeliveryVoucherTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const theme = useTheme();

  const { code, reportingDate, warehouse, status } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const getStatusLabel = (status: DeliveryVoucherStatus): LabelColor => {
    switch (status) {
      case 'Pending':
        return 'default';
      case 'Delivered':
        return 'primary';
      case 'Cancelled':
        return 'error';
      case 'Done':
        return 'success';
      default:
        return 'warning';
    }
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Typography variant="subtitle2" color="text.primary" component="div">
          {code}
        </Typography>
      </TableCell>

      <TableCell align="left">{warehouse?.name}</TableCell>

      <TableCell align="left">{fDate(reportingDate)}</TableCell>

      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={getStatusLabel(status)}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Xem
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Chỉnh sửa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
