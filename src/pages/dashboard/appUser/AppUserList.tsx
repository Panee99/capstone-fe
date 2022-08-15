import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Tab,
  Tabs,
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
  Alert,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// @types
import { UserManager } from '../../../@types/user';
// _mock_
import { _userList } from '../../../_mock';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
  TableSkeleton,
} from '../../../components/table';
// sections
import { useDispatch, useSelector } from 'src/redux/store';
import { deleteAppUser, getAppUser, searchAppUser } from 'src/redux/slices/appUser';
import useToggle from 'src/hooks/useToggle';
import { AppUserTableRow, AppUserTableToolbar } from 'src/sections/@dashboard/app-user/list';
import AppUserEditForm from 'src/sections/@dashboard/app-user/form/AppUserEditForm';
import Loading from 'src/components/Loading';
import { BaseLoading } from 'src/@types/generic';
import AppUserAddForm from 'src/sections/@dashboard/app-user/form/AppUserAddForm';
import { unwrapResult } from '@reduxjs/toolkit';
import { DEFAULT_ERROR } from 'src/utils/constants';
import { useSnackbar } from 'notistack';
import AppUserPermissionForm from '../../../sections/@dashboard/app-user/form/AppUserPermissionForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', align: 'left' },
  { id: 'username', label: 'Tài khoản', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'phone', label: 'Số điện thoại', align: 'left' },
  { id: 'gender', label: 'Giới tính', align: 'center' },
  { id: 'isActive', label: 'Trạng thái', align: 'center' },
  { id: 'inWarehouse', label: 'Kho', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const dispatch = useDispatch();

  const {
    list: { totalRows, items },
    single,
    loading,
  } = useSelector((state) => state.appUser);

  const { toggle, setToggle } = useToggle();

  const [isEdit, setIsEdit] = useState(false);

  const [isEditPermission, setIsEditPermission] = useState(false);

  const [isAdd, setIsAdd] = useState(false);

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

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const [filterKeyword, setFilterKeyword] = useState('');

  const [errorSearch, setErrorSearch] = useState<string | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const search = async () => {
    try {
      const actionResult = await dispatch(
        searchAppUser({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage })
      );
      unwrapResult(actionResult);
    } catch (error) {
      setErrorSearch(error?.message || error || DEFAULT_ERROR);
    }
  };

  useEffect(() => {
    search();
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleDeleteRow = async (id: string) => {
    try {
      const result = await dispatch(deleteAppUser({ ids: [id] }));
      unwrapResult(result);
      search();
      setSelected([]);
      enqueueSnackbar('Xóa 1 dòng thành công');
    } catch (error) {
      enqueueSnackbar(error?.message || error || DEFAULT_ERROR);
    }
  };

  const handleDeleteRows = async (ids: string[]) => {
    try {
      const result = await dispatch(deleteAppUser({ ids }));
      unwrapResult(result);
      search();
      setSelected([]);
      enqueueSnackbar(`Xóa ${ids.length} dòng thành công`);
    } catch (error) {
      enqueueSnackbar(error?.message || error || DEFAULT_ERROR);
    }
  };

  const handleEditRow = (id: string) => {
    setIsEditPermission(false);
    setIsAdd(false);
    setIsEdit(true);
    dispatch(getAppUser({ id }));
    setToggle(true);
  };

  const handleEditPermission = (id: string) => {
    setIsEdit(false);
    setIsAdd(false);
    setIsEditPermission(true);
    dispatch(getAppUser({ id }));
    setToggle(true);
  };

  const handleFilterKeyword = (filterKeyword: string) => {
    setFilterKeyword(filterKeyword);
    setPage(0);
  };

  const onCreateSuccess = () => {
    search();
    setToggle(false);
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !items.length && !!filterKeyword;

  return (
    <Page title="Danh sách người dùng">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách người dùng"
          links={[{ name: 'Thống kê', href: PATH_DASHBOARD.root }, { name: 'Người dùng' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => {
                setIsAdd(true);
                setToggle(true);
                setIsEdit(false);
                setIsEditPermission(false);
              }}
            >
              Tạo người dùng
            </Button>
          }
        />

        <Card>
          <Divider />

          <AppUserTableToolbar
            filterKeyword={filterKeyword}
            onFilterKeyword={handleFilterKeyword}
          />
          {!!errorSearch && <Alert severity="error">{errorSearch}</Alert>}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={items.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      items.map((row) => row.id)
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
                  rowCount={items.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      items.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(loading === 'SEARCH' ? [...Array(rowsPerPage)] : items).map((row, index) =>
                    row ? (
                      <AppUserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onEditPermission={() => handleEditPermission(row.id)}
                      />
                    ) : (
                      !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    )
                  )}
                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRows}
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
      <Drawer
        anchor="right"
        open={toggle}
        onClose={() => setToggle(false)}
        BackdropProps={{ invisible: true }}
      >
        <Box sx={{ maxWidth: '1000px', width: '500px', minWidth: '25vw', p: 3 }}>
          <Box textAlign="right">
            <IconButton onClick={() => setToggle(false)}>
              <Iconify icon={'ant-design:close-circle-outlined'} />
            </IconButton>
          </Box>
          {loading === 'GET' && <Loading />}
          {isEdit && !loading && single ? (
            <AppUserEditForm payload={single!} onSuccess={onCreateSuccess} />
          ) : (
            ''
          )}
          {isAdd ? <AppUserAddForm onSuccess={onCreateSuccess} /> : ''}
          {isEditPermission && single ? (
            <AppUserPermissionForm payload={single!} onSuccess={() => setToggle(false)} />
          ) : (
            ''
          )}
        </Box>
      </Drawer>
    </Page>
  );
}
