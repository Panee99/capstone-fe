import {
  GetProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
  SearchProductSchema,
  DeleteProductSchema,
  ProductState,
} from '../../@types/product';
import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: ProductState = {
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
  name: 'product',
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
    searchProduct(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getProduct(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createProduct(state) {
      state.loading = null;
    },
    updateProduct(state) {
      state.loading = null;
    },
    deleteProduct(state) {
      state.loading = null;
    },
    deleteMulProduct(state) {
      state.loading = null;
    },
  },
});

export default slice.reducer;
export const { hasError, clearError } = slice.actions;

export function searchProduct(params: SearchProductSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.SEARCH));
    const response = await axios.post('/product/search', params);

    dispatch(slice.actions.searchProduct(response.data));
  };
}

export function getProduct(params: GetProductSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.GET));
    const response = await axios.get('/product', { params });
    dispatch(slice.actions.getProduct(response.data));
  };
}

export function createProduct(params: CreateProductSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.CREATE));
    await axios.post('/product', params);
    dispatch(slice.actions.createProduct());
  };
}

export function updateProduct(params: UpdateProductSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.UPDATE));
    await axios.put('/product', params);
    dispatch(slice.actions.updateProduct());
  };
}

export function deleteProduct(params: DeleteProductSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.DELETE));
    await axios.delete('/product', { data: [...params.ids] });
    dispatch(slice.actions.deleteProduct());
  };
}
