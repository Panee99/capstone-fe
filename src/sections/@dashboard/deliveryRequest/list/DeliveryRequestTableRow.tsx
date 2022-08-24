import { useState } from 'react';
import { Checkbox, TableRow, TableCell, MenuItem, Typography, useTheme } from '@mui/material';
import { DeliveryRequest, DeliveryRequestStatus } from 'src/@types/vouchers/deliveryRequest';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import { fDate } from 'src/utils/formatTime';
import Label, { LabelColor } from 'src/components/Label';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

type Props = {
  row: DeliveryRequest;
  selected: boolean;
  onSelectRow: VoidFunction;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onCreateVoucher: VoidFunction;
};

export default function DeliveryRequestTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
  onCreateVoucher,
}: Props) {
  const navigate = useNavigate();

  const theme = useTheme();

  const { code, reportingDate, warehouse, status } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const getStatusLabel = (status: DeliveryRequestStatus): LabelColor => {
    switch (status) {
      case 'Pending':
        return 'default';
      case 'Confirmed':
        return 'primary';
      case 'Cancelled':
        return 'error';
      case 'Done':
        return 'success';
      default:
        return 'warning';
    }
  };

  const getStatusData = (status: DeliveryRequestStatus) => {
      switch (status) {
          case 'Pending':
              return 'Đang chờ';
          case 'Confirmed':
              return 'Xác nhận';
          case 'Cancelled':
              return 'Hủy';
          case 'Done':
              return 'Hoàn thành';
          default:
              return 'Lỗi';
      }
  }

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
          {getStatusData(status)}
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
                  onCreateVoucher();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Tạo phiếu
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
