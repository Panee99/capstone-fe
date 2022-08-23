import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows } from '../../../hooks/useTable';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
import { dispatch, useSelector } from 'src/redux/store';
import { deleteMulDeliveryVoucher, searchDeliveryVoucher } from 'src/redux/slices/deliveryVoucher';
import {
  DeliveryVoucherTableRow,
  DeliveryVoucherTableToolbar,
} from 'src/sections/@dashboard/deliveryVoucher/list';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const TABLE_HEAD = [
  { id: 'code', label: 'Mã', align: 'left' },
  { id: 'warehouse', label: 'Kho', align: 'left' },
  { id: 'reportingDate', label: 'Ngày báo cáo', align: 'left' },
  { id: 'status', label: 'Trạng thái', align: 'center' },
  { id: '' },
];

export default function DeliveryVoucherList() {
  const { list, single, loading } = useSelector((state) => state.deliveryVoucher);

  const { items: tableData, totalRows: toal } = list;

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      searchDeliveryVoucher({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage })
    );
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleViewRow = async (id: string) => {
    navigate(PATH_DASHBOARD.deliveryVoucher.view(id));
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteMulDeliveryVoucher({ ids: [id] }));
    dispatch(searchDeliveryVoucher({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleDeleteRows = async (ids: string[]) => {
    await dispatch(deleteMulDeliveryVoucher({ ids }));
    dispatch(searchDeliveryVoucher({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.deliveryVoucher.edit(id));
  };

  const handleFilterKeyword = (filterKeyword: string) => {
    setFilterKeyword(filterKeyword);
    setPage(0);
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length && !!filterKeyword;
  return (
    <Page title="Danh sách phiếu xuất kho">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách phiếu xuất kho"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Phiếu xuất kho' },
            { name: 'Danh sách' },
          ]}
        />

        <Card>
          <Divider />

          <DeliveryVoucherTableToolbar
            filterKeyword={filterKeyword}
            onFilterKeyword={handleFilterKeyword}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Xóa">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <DeliveryVoucherTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
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
      </Container>
    </Page>
  );
}
