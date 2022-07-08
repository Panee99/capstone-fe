import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRowsProp,
  GridValueFormatterParams,
  useGridApiContext,
} from '@mui/x-data-grid';
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
  Autocomplete,
  TextField,
  Select,
  SelectChangeEvent,
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
import { BaseLoading, FetchModel } from 'src/@types/generic';
import { WarehouseTableToolbar } from 'src/sections/@dashboard/warehouse/list';
import WarehouseEditForm from 'src/sections/@dashboard/warehouse/form/WarehouseEditForm';
import WarehouseAddForm from 'src/sections/@dashboard/warehouse/form/WarehouseAddForm';
import useSettings from 'src/hooks/useSettings';
import { useEffect, useState } from 'react';
import useTabs from 'src/hooks/useTabs';
import useToggle from 'src/hooks/useToggle';
import { useDispatch, useSelector } from 'src/redux/store';
import useTable from 'src/hooks/useTable';
import { getBeginningVoucher, searchBeginningVoucher } from 'src/redux/slices/beginningVoucher';
import NetworkAutocomplete from 'src/components/hook-form/NetworkAutocomplete';
import { BeginningVoucher, BeginningVoucherDetail } from 'src/@types/vouchers/beginningVoucher';
import axios from 'src/utils/axios';

export default function BasicRowEditingGrid() {
  const dispatch = useDispatch();

  const { list, single, loading } = useSelector((state) => state.beginningVoucher);

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

  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    dispatch(getBeginningVoucher({ id: '95719ba0-a016-42d7-ba20-64b5fd026960' }));
  }, [dispatch, filterKeyword, page, rowsPerPage]);

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

  function SelectProductInputCells(props: GridRenderCellParams) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const [products, setProducts] = useState<FetchModel[]>([]);

    useEffect(() => {
      async function fetch() {
        const response = await axios.post('/product/fetch', { keyword: '' });
        setProducts(response.data);
      }

      fetch();
    }, []);

    const handleChange = async (event: SelectChangeEvent) => {
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <Select
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ height: 1, width: '100%', border: 0 }}
        native
        autoFocus
      >
        {products.map((p) => (
          <option key={p.id}>{p.name}</option>
        ))}
      </Select>
    );
  }

  const renderSelectProductInputCell: GridColDef['renderCell'] = (params) => (
    <SelectProductInputCells {...params} />
  );

  const columns: GridColumns = [
    {
      field: 'product',
      headerName: 'Product',
      width: 180,
      editable: true,
      type: 'singleSelect',
      renderEditCell: renderSelectProductInputCell,
      valueFormatter: ({ value }: GridValueFormatterParams<FetchModel>) => value.name,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => [
        <GridActionsCellItem
          key={2}
          icon={<Iconify icon="ant-design:delete-filled" />}
          label="Cancel"
          className="textPrimary"
          onClick={() => handleDeleteRow(id.toString())}
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <Page title="Beginning Voucher: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Beginning Voucher List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Beginning Voucher', href: PATH_DASHBOARD.beginningVoucher.root },
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
              New Beginning Voucher
            </Button>
          }
        />

        <Card>
          <Divider />

          <WarehouseTableToolbar
            filterKeyword={filterKeyword}
            onFilterKeyword={handleFilterKeyword}
          />
          <div style={{ height: '100%', width: '100%' }}>
            {single ? (
              <DataGrid
                checkboxSelection
                disableSelectionOnClick
                editMode="row"
                style={{ height: '500px' }}
                rows={single!.details}
                columns={columns}
                // showCellRightBorder={true}
                // showColumnRightBorder={true}
                disableColumnMenu
                experimentalFeatures={{ newEditingApi: true }}
              />
            ) : (
              <Loading />
            )}
          </div>

          <Box sx={{ position: 'relative' }}>
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
          {/* {isEdit && !loading && single ? (
            <WarehouseEditForm payload={single!} onSuccess={() => setToggle(false)} />
          ) : (
            ''
          )} */}
          {!isEdit ? <WarehouseAddForm onSuccess={() => setToggle(false)} /> : ''}
        </Box>
      </Drawer>
    </Page>
  );
}

// https://codesandbox.io/s/oxqs9v?file=/demo.tsx:3511-3656
