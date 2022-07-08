import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';
import { randomCreatedDate, randomTraderName, randomUpdatedDate } from '@mui/x-data-grid-generator';
// @mui
import {
  Box,
  Card,
  Switch,
  Button,
  Tooltip,
  Divider,
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
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableSelectedActions } from '../../../components/table';
import Loading from 'src/components/Loading';
import { BaseLoading } from 'src/@types/generic';
import { WarehouseTableToolbar } from 'src/sections/@dashboard/warehouse/list';
import WarehouseEditForm from 'src/sections/@dashboard/warehouse/form/WarehouseEditForm';
import WarehouseAddForm from 'src/sections/@dashboard/warehouse/form/WarehouseAddForm';
import useSettings from 'src/hooks/useSettings';
import { useState } from 'react';
import useTabs from 'src/hooks/useTabs';
import useToggle from 'src/hooks/useToggle';
import { useDispatch, useSelector } from 'src/redux/store';
import useTable from 'src/hooks/useTable';

export default function BasicRowEditingGrid() {
  const dispatch = useDispatch();

  const { list, single, loading } = useSelector((state) => state.warehouse);

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

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const [filterKeyword, setFilterKeyword] = useState('');

  //   useEffect(() => {
  //     dispatch(searchWarehouse({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage }));
  //   }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleDeleteRow = async (id: string) => {
    // await dispatch(deleteWarehouse({ ids: [id] }));
    // dispatch(searchWarehouse({ pageIndex: 1 }));
    // setSelected([]);
  };

  const handleDeleteRows = async (ids: string[]) => {
    //     await dispatch(deleteWarehouse({ ids }));
    //     dispatch(searchWarehouse({ pageIndex: 1 }));
    //     setSelected([]);
  };

  const handleEditRow = (id: string) => {
    // setIsEdit(true);
    // dispatch(getWarehouse({ id }));
    // setToggle(true);
  };

  const handleFilterKeyword = (filterKeyword: string) => {
    setFilterKeyword(filterKeyword);
    setPage(0);
  };

  return (
    <Page title="Warehouse: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Warehouse List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Warehouse', href: PATH_DASHBOARD.warehouse.root },
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
              New Warehouse
            </Button>
          }
        />

        <Card>
          <Divider />

          <WarehouseTableToolbar
            filterKeyword={filterKeyword}
            onFilterKeyword={handleFilterKeyword}
          />

          {/* <Scrollbar>
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
              )} */}
          <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
              style={{ height: '500px' }}
              editMode="row"
              rows={rows}
              columns={columns}
              checkboxSelection
              experimentalFeatures={{ newEditingApi: true }}
            />
          </div>
          {/* </TableContainer>
          </Scrollbar> */}

          <Box sx={{ position: 'relative' }}>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            /> */}

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
          {loading === BaseLoading.GET && <Loading />}
          {isEdit && !loading && single ? (
            <WarehouseEditForm payload={single!} onSuccess={() => setToggle(false)} />
          ) : (
            ''
          )}
          {!isEdit ? <WarehouseAddForm onSuccess={() => setToggle(false)} /> : ''}
        </Box>
      </Drawer>
    </Page>
  );
}

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
