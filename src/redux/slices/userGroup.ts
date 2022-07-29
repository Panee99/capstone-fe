import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  UserGroupState,
  CreateUserGroupSchema,
  DeleteUserGroupSchema,
  GetUserGroupSchema,
  SearchUserGroupSchema,
  UpdateUserGroupSchema,
} from 'src/@types/userGroup';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const initialState: UserGroupState = {
  loading: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const searchUserGroup = createAsyncThunk<void, SearchUserGroupSchema>(
  'usergroup/search',
  async (params, api) => {
    const response = await axios.post('/warehouse/group/search', params);
    api.dispatch(slice.actions.searchUserGroup(response.data));
  }
);

export const getUserGroup = createAsyncThunk<void, GetUserGroupSchema>(
  'usergroup/get',
  async (params, api) => {
    const response = await axios.get('/warehouse/group', { params });
    api.dispatch(slice.actions.getUserGroup(response.data));
  }
);

export const createUserGroup = createAsyncThunk<void, CreateUserGroupSchema>(
  'usergroup/create',
  async (params) => {
    await axios.post('/warehouse/group', params);
  }
);

export const updateUserGroup = createAsyncThunk<void, UpdateUserGroupSchema>(
  'usergroup/update',
  async (params, api) => {
    await axios.put('/warehouse/group', { ...params });
  }
);

export const deleteUserGroup = createAsyncThunk<void, DeleteUserGroupSchema>(
  'usergroup/delete',
  async (params, api) => {
    await axios.delete('/warehouse/group', { data: [...params.ids] });
  }
);

export const deleteMulUserGroup = createAsyncThunk<void, DeleteUserGroupSchema>(
  'usergroup/deletemul',
  async (params, api) => {
    await axios.delete('/warehouse/group', { data: [...params.ids] });
  }
);

export const getListPermission = createAsyncThunk<string[], void>(
  'usergroup/getlistpermission',
  async () => {
    const res = await axios.get('/warehouse/group/allpermission', {});
    return res.data;
  }
);

const slice = createSlice({
  name: 'userGroup',
  initialState,
  reducers: {
    searchUserGroup(state, action) {
      state.list = action.payload;
    },
    getUserGroup(state, action) {
      state.single = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createUserGroup.pending, (state) => {
      state.loading = 'CREATE';
    });
    builder.addCase(createUserGroup.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(createUserGroup.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(getUserGroup.pending, (state) => {
      state.loading = 'GET';
    });
    builder.addCase(getUserGroup.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(getUserGroup.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(searchUserGroup.pending, (state) => {
      state.loading = 'SEARCH';
    });
    builder.addCase(searchUserGroup.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(searchUserGroup.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(updateUserGroup.pending, (state) => {
      state.loading = 'UPDATE';
    });
    builder.addCase(updateUserGroup.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(updateUserGroup.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteUserGroup.pending, (state) => {
      state.loading = 'DELETE';
    });
    builder.addCase(deleteUserGroup.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteUserGroup.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulUserGroup.pending, (state) => {
      state.loading = 'DELETE_MUL';
    });
    builder.addCase(deleteMulUserGroup.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulUserGroup.rejected, (state) => {
      state.loading = null;
    });
  },
});

export default slice.reducer;
