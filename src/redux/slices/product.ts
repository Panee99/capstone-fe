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
import { UnpackNestedValue } from "react-hook-form";

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

export function createProduct(params: { onHandMin: UnpackNestedValue<(CreateProductSchema & { afterSubmit?: string })["onHandMin"]>; onHandMax: UnpackNestedValue<(CreateProductSchema & { afterSubmit?: string })["onHandMax"]>; name: UnpackNestedValue<(CreateProductSchema & { afterSubmit?: string })["name"]>; description: UnpackNestedValue<(CreateProductSchema & { afterSubmit?: string })["description"]>; categories: string[]; afterSubmit?: UnpackNestedValue<(CreateProductSchema & { afterSubmit?: string })["afterSubmit"]> }) {
  return async () => {
    await axios.post('/product', params);
    dispatch(slice.actions.createProduct());
  };
}

export function updateProduct(params: { code: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["code"]>; onHandMin?: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["onHandMin"]>; onHandMax?: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["onHandMax"]>; name: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["name"]>; description: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["description"]>; id: string; categories: string[]; isActive: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["isActive"]>; afterSubmit?: UnpackNestedValue<(UpdateProductSchema & { afterSubmit?: string })["afterSubmit"]> }) {
  return async () => {
    await axios.put('/product', params);
    dispatch(slice.actions.updateProduct());
  };
}

export function deleteProduct(params: DeleteProductSchema) {
  return async () => {
    await axios.delete('/product', { data: [...params.ids] });
    dispatch(slice.actions.deleteProduct());
  };
}
