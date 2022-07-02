import {
  GetCategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
  SearchCategorySchema,
  DeleteCategorySchema,
  CategoryState,
} from '../../@types/category';
import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: CategoryState = {
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
  name: 'category',
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
    searchCategory(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getCategory(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createCategory(state) {
      state.loading = null;
    },
    updateCategory(state) {
      state.loading = null;
    },
    deleteCategory(state) {
      state.loading = null;
    },
    deleteMulCategory(state) {
      state.loading = null;
    },
  },
});

export default slice.reducer;
export const { hasError, clearError } = slice.actions;

export function searchCategory(params: SearchCategorySchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.SEARCH));
    const response = await axios.post('/category/search', params);

    dispatch(slice.actions.searchCategory(response.data));
  };
}

export function getCategory(params: GetCategorySchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.GET));
    const response = await axios.get('/category', { params });
    dispatch(slice.actions.getCategory(response.data));
  };
}

export function createCategory(params: CreateCategorySchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.CREATE));
    await axios.post('/category', params);
    dispatch(slice.actions.createCategory());
  };
}

export function updateCategory(params: UpdateCategorySchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.UPDATE));
    await axios.put('/category', params);
    dispatch(slice.actions.updateCategory());
  };
}

export function deleteCategory(params: DeleteCategorySchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.DELETE));
    await axios.delete('/category', { data: [...params.ids] });
    dispatch(slice.actions.deleteCategory());
  };
}
