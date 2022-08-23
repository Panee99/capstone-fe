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
import { deleteCategory, getCategory, searchCategory } from 'src/redux/slices/category';
import { CategoryTableRow, CategoryTableToolbar } from 'src/sections/@dashboard/category/list';
import CategoryEditForm from 'src/sections/@dashboard/category/form/CategoryEditForm';
import CategoryAddForm from 'src/sections/@dashboard/category/form/CategoryAddForm';
import { AppUserTableRow } from "../../../sections/@dashboard/app-user/list";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', align: 'left' },
  { id: 'description', label: 'Mô tả', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function CategoryList() {
  const dispatch = useDispatch();

  const { list, single, loading } = useSelector((state) => state.category);

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
    dispatch(searchCategory({ name: filterKeyword, pageIndex: page + 1, pageSize: rowsPerPage }));
  }, [dispatch, filterKeyword, page, rowsPerPage]);

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteCategory({ ids: [id] }));
    dispatch(searchCategory({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleDeleteRows = async (ids: string[]) => {
    await dispatch(deleteCategory({ ids }));
    dispatch(searchCategory({ pageIndex: 1 }));
    setSelected([]);
  };

  const handleEditRow = (id: string) => {
    setIsEdit(true);
    dispatch(getCategory({ id }));
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
    <Page title="Danh sách loại sản phẩm">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Danh sách loại sản phẩm"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Loại sản phẩm', href: PATH_DASHBOARD.category.root },
            { name: 'Danh sách' },
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
              Thêm loại sản phẩm
            </Button>
          }
        />

        <Card>
          <Divider />

          <CategoryTableToolbar
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
                          <CategoryTableRow
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
            <CategoryEditForm payload={single!} onSuccess={() => setToggle(false)} />
          ) : (
            ''
          )}
          {!isEdit ? <CategoryAddForm onSuccess={() => setToggle(false)} /> : ''}
        </Box>
      </Drawer>
    </Page>
  );
}

// ----------------------------------------------------------------------
