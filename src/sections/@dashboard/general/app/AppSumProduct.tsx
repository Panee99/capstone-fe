import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Switch,
  Checkbox,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import {
  TableMoreMenu,
  TableHeadCustom,
  TableSelectedActions,
  TableEmptyRows,
  TableNoData,
} from '../../../../components/table';
import { SumProduct } from 'src/@types/sumProduct';
import { useEffect, useState } from 'react';
import { dispatch, useSelector } from 'src/redux/store';
import { searchSumProduct } from 'src/redux/slices/sumProduct';
import useTable, { emptyRows } from 'src/hooks/useTable';
import useSettings from 'src/hooks/useSettings';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'productName', label: 'Product Name', align: 'left' },
  { id: 'quantity', label: 'Quantity', align: 'center' },
];

interface Props extends CardProps {
  title?: string;
  subheader?: string;
}

export default function AppSumProduct({ title, subheader, ...other }: Props) {
  const { list, loading } = useSelector((state) => state.sumProduct);

  const { items: tableData, totalRows: total } = list;

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    dispatch(searchSumProduct({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage }));
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleFilterKeyword = (filterKeyword: string) => {
    setFilterKeyword(filterKeyword);
    setPage(0);
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length && !!filterKeyword;

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          <Table size={dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              onSort={onSort}
            />

            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <AppSumProductRow key={row.productId} row={row} />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />

        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppSumProductRowProps = {
  row: SumProduct;
};

function AppSumProductRow({ row }: AppSumProductRowProps) {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>{row.productName}</TableCell>

      <TableCell align="center">{row.quantity}</TableCell>
    </TableRow>
  );
}
