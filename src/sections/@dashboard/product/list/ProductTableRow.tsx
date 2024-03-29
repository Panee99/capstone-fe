import { useState } from 'react';
import { Checkbox, TableRow, TableCell, MenuItem, Typography } from '@mui/material';
import { Product } from 'src/@types/product';
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';

type Props = {
  row: Product;
  selected: boolean;
  onEditRow: Function;
  onSelectRow: VoidFunction;
  onDeleteRow: Function;
};

export default function ProductTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { id, code, name, description, onHandMin, onHandMax, categories } = row;

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

      <TableCell align="left">{code}</TableCell>

      <TableCell align="left">{name}</TableCell>

      <TableCell align="left">{description}</TableCell>

      <TableCell align="center">{onHandMin}</TableCell>

      <TableCell align="center">{onHandMax}</TableCell>

      <TableCell align="center">{categories.map(category => category.name)}</TableCell>

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
                Chỉnh sửa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onDeleteRow(id);
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
