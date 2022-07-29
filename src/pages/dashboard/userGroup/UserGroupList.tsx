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
} from '../../../components/table';
// sections
import { useDispatch, useSelector } from 'src/redux/store';
import {
  deleteMulUserGroup,
  deleteUserGroup,
  getUserGroup,
  searchUserGroup,
} from 'src/redux/slices/userGroup';
import useToggle from 'src/hooks/useToggle';
import UserGroupTableRow from 'src/sections/@dashboard/user-group/list/UserGroupTableRow';
import UserGroupTableToolbar from 'src/sections/@dashboard/user-group/list/UserGroupTableToolbar';
import UserGroupEditForm from 'src/sections/@dashboard/user-group/form/UserGroupEditForm';
import Loading from 'src/components/Loading';
import { BaseLoading } from 'src/@types/generic';
import UserGroupAddForm from 'src/sections/@dashboard/user-group/form/UserGroupAddForm';
import { unwrapResult } from '@reduxjs/toolkit';
import { DEFAULT_ERROR } from 'src/utils/constants';
import { useSnackbar } from 'notistack';
import UserGroupAddEditForm from 'src/sections/@dashboard/user-group/form/UserGroupAddEditForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'canUpdate', label: 'Type', align: 'center' },
  { id: '' },
];
// ----------------------------------------------------------------------

export default function UserGroupList() {
  const dispatch = useDispatch();

  const { list, single, loading } = useSelector((state) => state.userGroup);

  const { toggle, setToggle } = useToggle();

  const [isEdit, setIsEdit] = useState(false);

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

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const [filterKeyword, setFilterKeyword] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const search = async () => {
    try {
      const actionResult = await dispatch(
        searchUserGroup({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage })
      );
      unwrapResult(actionResult);
    } catch (error) {
      setError(error?.message || error || DEFAULT_ERROR);
    }
  };

  useEffect(() => {
    search();
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleDeleteRow = async (id: string) => {
    try {
      const result = await dispatch(deleteUserGroup({ ids: [id] }));
      unwrapResult(result);
      search();
      setSelected([]);
      enqueueSnackbar('Deleted 1 row success');
    } catch (error) {
      setError(error?.message || error || DEFAULT_ERROR);
    }
  };

  const handleDeleteRows = async (ids: string[]) => {
    try {
      const result = await dispatch(deleteMulUserGroup({ ids }));
      unwrapResult(result);
      search();
      setSelected([]);
      enqueueSnackbar(`Deleted ${ids.length} rows success`);
    } catch (error) {
      setError(error?.message || error || DEFAULT_ERROR);
    }
  };

  const handleEditRow = async (id: string) => {
    setIsEdit(true);
    try {
      const result = await dispatch(getUserGroup({ id }));
      unwrapResult(result);
    } catch (error) {
      setError(error?.message || error || DEFAULT_ERROR);
    }
    setToggle(true);
  };

  const handleFilterKeyword = (filterKeyword: string) => {
    setFilterKeyword(filterKeyword);
    setPage(0);
  };

  const handleAddEditSuccess = () => {
    setToggle(false);
    search();
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !tableData.length && !!filterKeyword;

  return (
    <Page title="UserGroup: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="UserGroup List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Usergroup', href: PATH_DASHBOARD.userGroup.root },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => {
                setToggle(true);
                setIsEdit(false);
              }}
            >
              New UserGroup
            </Button>
          }
        />

        <Card>
          <UserGroupTableToolbar
            filterKeyword={filterKeyword}
            onFilterKeyword={handleFilterKeyword}
          />
          {!!error && <Alert severity="error">{error}</Alert>}

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
                      <UserGroupTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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
          {/* {loading === BaseLoading.GET && <Loading />} */}
          {isEdit && !loading && single ? (
            <UserGroupAddEditForm
              currentGroup={single!}
              isEdit
              onSuccess={() => handleAddEditSuccess()}
            />
          ) : (
            ''
          )}
          {!isEdit ? <UserGroupAddEditForm onSuccess={() => handleAddEditSuccess()} /> : ''}
        </Box>
      </Drawer>
    </Page>
  );
}
