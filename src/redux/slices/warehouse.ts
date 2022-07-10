import {
  GetWarehouseSchema,
  CreateWarehouseSchema,
  UpdateWarehouseSchema,
  SearchWarehouseSchema,
  DeleteWarehouseSchema,
  WarehouseState,
} from '../../@types/warehouse';
import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: WarehouseState = {
  loading: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

const slice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading = action.payload;
    },
    searchWarehouse(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getWarehouse(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createWarehouse(state) {
      state.loading = null;
    },
    updateWarehouse(state) {
      state.loading = null;
    },
    deleteWarehouse(state) {
      state.loading = null;
    },
    deleteMulWarehouse(state) {
      state.loading = null;
    },
  },
});

export default slice.reducer;

export function searchWarehouse(params: SearchWarehouseSchema) {
  return async () => {
    const response = await axios.post('/warehouse/search', params);

    dispatch(slice.actions.searchWarehouse(response.data));
  };
}

export function getWarehouse(params: GetWarehouseSchema) {
  return async () => {
    const response = await axios.get('/warehouse', { params });
    dispatch(slice.actions.getWarehouse(response.data));
  };
}

export function createWarehouse(params: CreateWarehouseSchema) {
  return async () => {
    await axios.post('/warehouse', params);
    dispatch(slice.actions.createWarehouse());
  };
}

export function updateWarehouse(params: UpdateWarehouseSchema) {
  return async () => {
    await axios.put('/warehouse', params);
    dispatch(slice.actions.updateWarehouse());
  };
}

export function deleteWarehouse(params: DeleteWarehouseSchema) {
  return async () => {
    await axios.delete('/warehouse', { data: [...params.ids] });
    dispatch(slice.actions.deleteWarehouse());
  };
}
