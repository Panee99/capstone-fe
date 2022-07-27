import { createSlice } from '@reduxjs/toolkit';
import { BaseLoading } from '../../@types/generic';
import {
  UserGroupState,
  CreateUserGroupSchema,
  DeleteUserGroupSchema,
  GetUserGroupSchema,
  SearchUserGroupSchema,
  UpdateUserGroupSchema,
} from 'src/@types/userGroup';
import { dispatch } from '../store';
import axios from '../../utils/axios';
const DEFAULT_PAGE_SIZE = 5;

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

const slice = createSlice({
  name: 'userGroup',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading = action.payload;
    },

    searchUserGroup(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getUserGroup(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createUserGroup(state) {
      state.loading = null;
    },
    updateUserGroup(state) {
      state.loading = null;
    },
    deleteUserGroup(state) {
      state.loading = null;
    },
    deleteMulUserGroup(state) {
      state.loading = null;
    },
  },
});
export default slice.reducer;

export function searchUserGroup(params: SearchUserGroupSchema) {
  return async () => {
    const response = await axios.post('/warehouse/group/search', params);

    dispatch(slice.actions.searchUserGroup(response.data));
  };
}

export function getUserGroup(params: GetUserGroupSchema) {
  return async () => {
    const response = await axios.get('/warehouse/group' , {params});
    dispatch(slice.actions.getUserGroup(response.data));
  };
}
export function createUserGroup(params: CreateUserGroupSchema) {
  return async () => {
    await axios.post('/warehouse/group', params);
    dispatch(slice.actions.createUserGroup());
  };
}
export function updateUserGroup(params: UpdateUserGroupSchema) {
  return async () => {
    await axios.put('/warehouse/group', { ...params });
    dispatch(slice.actions.updateUserGroup());
  };
}
export function deleteUserGroup(params: DeleteUserGroupSchema) {
  return async () => {
    await axios.delete('/warehouse/group', { data: [...params.ids] });
    dispatch(slice.actions.deleteUserGroup());
  };
}
// export function deleteMulUserGroup(params: DeleteUserGroupSchema) {
//   return async () => {
//     await axios.delete('/user', { data: [...params.ids] });
//     dispatch(slice.actions.deleteUserGroup());
//   };
// }
