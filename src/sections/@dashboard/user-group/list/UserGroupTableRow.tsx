import { useState } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem, Typography, useTheme } from '@mui/material';
import { UserGroup } from 'src/@types/userGroup';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  row: UserGroup;
  selected: boolean;
  onEditRow: Function;
  onSelectRow: VoidFunction;
  onDeleteRow: Function;
};

export default function UserGroupTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { id, name, description, canUpdate } = row;

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
        <Typography variant="subtitle2" color="text.primary" component="div">
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{description}</TableCell>

      <TableCell align="center">
        {!canUpdate ? (
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={'info'}
            sx={{ textTransform: 'capitalize' }}
          >
            Default
          </Label>
        ) : null}
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
                  onEditRow(id);
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
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
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
