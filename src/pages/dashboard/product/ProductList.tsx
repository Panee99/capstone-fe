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
  TableSelectedActions, TableSkeleton,
} from '../../../components/table';
import { useDispatch, useSelector } from 'src/redux/store';
import useToggle from 'src/hooks/useToggle';
import Loading from 'src/components/Loading';
import { BaseLoading } from 'src/@types/generic';
import { deleteProduct, getProduct, searchProduct } from 'src/redux/slices/product';
import { ProductTableRow, ProductTableToolbar } from 'src/sections/@dashboard/product/list';
import ProductEditForm from 'src/sections/@dashboard/product/form/ProductEditForm';
import ProductAddForm from 'src/sections/@dashboard/product/form/ProductAddForm';
import { CategoryTableRow } from "../../../sections/@dashboard/category/list";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'code', label: 'Mã', align: 'left' },
  { id: 'name', label: 'Tên', align: 'left' },
  { id: 'description', label: 'Mô tả', align: 'left' },
  { id: 'onHandMin', label: 'On hand Min', align: 'center' },
  { id: 'onHandMax', label: 'On hand Max', align: 'center' },
  { id: 'category', label: 'Loại sản phẩm', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ProductList() {
  const dispatch = useDispatch();

  const { list, single, loading } = useSelector((state) => state.product);

  const { toggle, setToggle } = useToggle();

  const [isEdit, setIsEdit] = useState(false);

  const [isAdd, setIsAdd] = useState(false);

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
    dispatch(searchProduct({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage }));
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteProduct({ ids: [id] }));
    dispatch(searchProduct({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleDeleteRows = async (ids: string[]) => {
    await dispatch(deleteProduct({ ids }));
    dispatch(searchProduct({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    setIsAdd(false);
    setIsEdit(true);
    dispatch(getProduct({ id }));
    setToggle(true);
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
    <Page title="Danh sách sản phẩm">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách sản phẩm"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Sản phẩm', href: PATH_DASHBOARD.product.root },
            { name: 'Danh sách' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={() => {
                setIsAdd(true);
                setToggle(true);
                setIsEdit(false);
              }}
            >
              Thêm sản phẩm
            </Button>
          }
        />

        <Card>
          <Divider />

          <ProductTableToolbar
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
                  {(loading === 'SEARCH' ? [...Array(rowsPerPage)] : tableData).map((row, index) =>
                      row ? (
                          <ProductTableRow
                              key={row.id}
                              row={row}
                              selected={selected.includes(row.id)}
                              onSelectRow={() => onSelectRow(row.id)}
                              onDeleteRow={() => handleDeleteRow(row.id)}
                              onEditRow={() => handleEditRow(row.id)}
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
              count={total}
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
            <ProductEditForm payload={single!} onSuccess={() => setToggle(false)} />
          ) : (
            ''
          )}
          {isAdd ? <ProductAddForm onSuccess={() => setToggle(false)} /> : ''}
        </Box>
      </Drawer>
    </Page>
  );
}

// ----------------------------------------------------------------------
