import { useEffect, useState } from 'react';
// @mui
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
  Drawer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
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
import { useDispatch, useSelector } from 'src/redux/store';
import useToggle from 'src/hooks/useToggle';
import Loading from 'src/components/Loading';
import { BaseLoading } from 'src/@types/generic';
import {
  deleteMulReceiveVoucherRequest,
  getReceiveVoucherRequest,
  searchReceiveVoucherRequest,
} from 'src/redux/slices/receiveVoucherRequest';
import {
  ReceiveVoucherRequestTableRow,
  ReceiveVoucherRequestTableToolbar,
} from 'src/sections/@dashboard/receiveVoucherRequest/list';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Code', align: 'left' },
  { id: 'warehouse', label: 'Warehouse', align: 'left' },
  { id: 'reportingDate', label: 'Reporting Date', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ReceiveVoucherRequestList() {
  const dispatch = useDispatch();

  const { list, single, loading } = useSelector((state) => state.receiveVoucherRequest);

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

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const [filterKeyword, setFilterKeyword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      searchReceiveVoucherRequest({
        name: filterKeyword,
        pageIndex: page + 1,
        pageSize: rowsPerPage,
      })
    );
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleViewRow = async (id: string) => {
    navigate(PATH_DASHBOARD.receiveVoucherRequest.view(id));
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteMulReceiveVoucherRequest({ ids: [id] }));
    dispatch(searchReceiveVoucherRequest({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleDeleteRows = async (ids: string[]) => {
    await dispatch(deleteMulReceiveVoucherRequest({ ids }));
    dispatch(searchReceiveVoucherRequest({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.receiveVoucherRequest.edit(id));
  };

  const handleFilterKeyword = (filterKeyword: string) => {
    setFilterKeyword(filterKeyword);
    setPage(0);
  };

  //   const dataFiltered = applySortFilter({
  //     tableData,
  //     comparator: getComparator(order, orderBy),
  //     filterName,
  //     filterRole,
  //     filterStatus,
  //   });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length && !!filterKeyword;

  return (
    <Page title="ReceiveVoucherRequest: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Receive Voucher Request List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Receive Voucher Request' },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              component={Link}
              to={PATH_DASHBOARD.receiveVoucherRequest.new}
            >
              New ReceiveVoucherRequest
            </Button>
          }
        />

        <Card>
          <Divider />

          <ReceiveVoucherRequestTableToolbar
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
                    <Tooltip title="Delete">
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
                      <ReceiveVoucherRequestTableRow
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

// ----------------------------------------------------------------------
