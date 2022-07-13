import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AppUserState,
  CreateAppUserSchema,
  DeleteAppUserSchema,
  GetAppUserSchema,
  SearchAppUserSchema,
  UpdateAppUserSchema,
} from 'src/@types/appUser';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const initialState: AppUserState = {
  loading: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const createAppUser = createAsyncThunk<void, CreateAppUserSchema>(
  'user/create',
  async (params) => {
    await axios.post('/user', params);
  }
);

export const getAppUser = createAsyncThunk<void, GetAppUserSchema>(
  'user/get',
  async (params, api) => {
    const response = await axios.get('/user', { params });
    api.dispatch(slice.actions.getAppUser(response.data));
  }
);

export const searchAppUser = createAsyncThunk<void, SearchAppUserSchema>(
  'user/search',
  async (params, api) => {
    const response = await axios.post('/user/search', params);
    api.dispatch(slice.actions.searchAppUser(response.data));
  }
);

export const updateAppUser = createAsyncThunk<void, UpdateAppUserSchema>(
  'user/update',
  async (params) => {
    await axios.put('/user', { ...params, inWarehouseId: params.inWarehouse?.id });
  }
);

export const deleteAppUser = createAsyncThunk<void, DeleteAppUserSchema>(
  'user/delete',
  async (params) => {
    await axios.delete('/user', { data: [...params.ids] });
  }
);

export const deleteMulAppUser = createAsyncThunk<void, DeleteAppUserSchema>(
  'user/deleteMul',
  async (params) => {
    await axios.delete('/user', { data: [...params.ids] });
  }
);

const slice = createSlice({
  name: 'appUser',
  initialState,
  reducers: {
    searchAppUser(state, action) {
      state.list = action.payload;
    },
    getAppUser(state, action) {
      state.single = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createAppUser.pending, (state) => {
      state.loading = 'CREATE';
    });
    builder.addCase(createAppUser.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(createAppUser.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(getAppUser.pending, (state) => {
      state.loading = 'GET';
    });
    builder.addCase(getAppUser.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(getAppUser.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(searchAppUser.pending, (state) => {
      state.loading = 'SEARCH';
    });
    builder.addCase(searchAppUser.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(searchAppUser.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(updateAppUser.pending, (state) => {
      state.loading = 'UPDATE';
    });
    builder.addCase(updateAppUser.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(updateAppUser.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteAppUser.pending, (state) => {
      state.loading = 'DELETE';
    });
    builder.addCase(deleteAppUser.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteAppUser.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulAppUser.pending, (state) => {
      state.loading = 'DELETE_MUL';
    });
    builder.addCase(deleteMulAppUser.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulAppUser.rejected, (state) => {
      state.loading = null;
    });
  },
});

export default slice.reducer;
