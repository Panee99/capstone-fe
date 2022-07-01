import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import {
  CustomerState,
  CreateCustomerSchema,
  DeleteCustomerSchema,
  GetCustomerSchema,
  SearchCustomerSchema,
  UpdateCustomerSchema,
} from 'src/@types/customer';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: CustomerState = {
  loading: null,
  error: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading = action.payload;
    },
    hasError(state, action) {
      state.loading = null;
      state.error = action.payload;
    },
    clearError(state) {
      state.loading = null;
      state.error = null;
    },
    searchCustomer(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getCustomer(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createCustomer(state) {
      state.loading = null;
    },
    updateCustomer(state) {
      state.loading = null;
    },
    deleteCustomer(state) {
      state.loading = null;
    },
    deleteMulCustomer(state) {
      state.loading = null;
    },
  },
});

export default slice.reducer;
export const { hasError, clearError } = slice.actions;

export function searchCustomer(params: SearchCustomerSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.SEARCH));
    const response = await axios.post('/customer/search', params);

    dispatch(slice.actions.searchCustomer(response.data));
  };
}

export function getCustomer(params: GetCustomerSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.GET));
    console.log('loading');

    const response = await axios.get('/customer', { params });
    dispatch(slice.actions.getCustomer(response.data));
  };
}

export function createCustomer(params: CreateCustomerSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.CREATE));
    await axios.post('/customer', params);
    dispatch(slice.actions.createCustomer());
  };
}

export function updateCustomer(params: UpdateCustomerSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.UPDATE));
    await axios.put('/customer', params);
    dispatch(slice.actions.updateCustomer());
  };
}

export function deleteCustomer(params: DeleteCustomerSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.DELETE));
    await axios.delete('/customer', { data: [...params.ids] });
    dispatch(slice.actions.deleteCustomer());
  };
}
