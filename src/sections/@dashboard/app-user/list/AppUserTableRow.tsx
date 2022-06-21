import { useState } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem, Typography, useTheme } from '@mui/material';
// @types
// import { BusinessUnit } from '../../../../@types/businessUnit';
// components
import { AppUser } from 'src/@types/appUser';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  row: AppUser;
  selected: boolean;
  onEditRow: Function;
  onSelectRow: VoidFunction;
  onDeleteRow: Function;
};

export default function BusinessUnitTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { id, username, email, firstName, lastName, phoneNumber, gender, isActive, inWarehouse } =
    row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Typography
          variant="subtitle2"
          color="text.primary"
          sx={{ cursor: 'pointer' }}
          component="div"
          onClick={() => onEditRow(id)}
        >
          {`${firstName} ${lastName}`}
        </Typography>
      </TableCell>

      <TableCell align="left">{username}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(isActive && 'success') || 'info'}
          sx={{ textTransform: 'capitalize' }}
        >
          {gender}
        </Label>
      </TableCell>
      <TableCell align="left">
        {' '}
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(isActive && 'success') || 'error'}
          sx={{ textTransform: 'capitalize' }}
        >
          {(isActive && 'Active') || 'InActive'}
        </Label>
      </TableCell>
      <TableCell align="left">{inWarehouse}</TableCell>

      {/* <TableCell align="left">{manager.name}</TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow(id);
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow(id);
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
