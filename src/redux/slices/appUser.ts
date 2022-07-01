import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import {
  AppUserState,
  CreateAppUserSchema,
  DeleteAppUserSchema,
  GetAppUserSchema,
  SearchAppUserSchema,
  UpdateAppUserSchema,
} from 'src/@types/appUser';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: AppUserState = {
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
  name: 'appUser',
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
    searchAppUser(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getAppUser(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createAppUser(state) {
      state.loading = null;
    },
    updateAppUser(state) {
      state.loading = null;
    },
    deleteAppUser(state) {
      state.loading = null;
    },
    deleteMulAppUser(state) {
      state.loading = null;
    },
  },
});

export default slice.reducer;
export const { hasError, clearError } = slice.actions;

export function searchAppUser(params: SearchAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.SEARCH));
    const response = await axios.post('/user/search', params);

    dispatch(slice.actions.searchAppUser(response.data));
  };
}

export function getAppUser(params: GetAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.GET));
    console.log('loading');

    const response = await axios.get('/user', { params });
    dispatch(slice.actions.getAppUser(response.data));
  };
}

export function createAppUser(params: CreateAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.CREATE));
    await axios.post('/user', params);
    dispatch(slice.actions.createAppUser());
  };
}

export function updateAppUser(params: UpdateAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.UPDATE));
    await axios.put('/user', { ...params, inWarehouseId: params.inWarehouse?.id });
    dispatch(slice.actions.updateAppUser());
  };
}

export function deleteAppUser(params: DeleteAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.DELETE));
    await axios.delete('/user', { data: [...params.ids] });
    dispatch(slice.actions.deleteAppUser());
  };
}

export function deleteMulAppUser(params: DeleteAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.DELETE));
    await axios.delete('/user', { data: [...params.ids] });
    dispatch(slice.actions.deleteAppUser());
  };
}
