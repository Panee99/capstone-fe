import {
  GetProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
  SearchProductSchema,
  DeleteProductSchema,
  ProductState,
  UpdateProductCategorySchema,
} from '../../@types/product';
import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: ProductState = {
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
  name: 'product',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading = action.payload;
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
    updateProductCategory(state) {
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

export function searchProduct(params: SearchProductSchema) {
  return async () => {
    const response = await axios.post('/product/search', params);

    dispatch(slice.actions.searchProduct(response.data));
  };
}

export function getProduct(params: GetProductSchema) {
  return async () => {
    const response = await axios.get('/product', { params });
    dispatch(slice.actions.getProduct(response.data));
  };
}

export function createProduct(params: CreateProductSchema) {
  return async () => {
    await axios.post('/product', params);
    dispatch(slice.actions.createProduct());
  };
}

export function updateProduct(params: UpdateProductSchema) {
  return async () => {
    await axios.put('/product', params);
    dispatch(slice.actions.updateProduct());
  };
}

export function updateProductCategory(params: UpdateProductCategorySchema) {
  return async () => {
    await axios.put('/product', params);
    dispatch(slice.actions.updateProductCategory());
  }
}

export function deleteProduct(params: DeleteProductSchema) {
  return async () => {
    await axios.delete('/product', { data: [...params.ids] });
    dispatch(slice.actions.deleteProduct());
  };
}
