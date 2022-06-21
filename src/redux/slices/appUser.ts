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
  isLoading: false,
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
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchAppUser(state, action) {
      state.isLoading = false;
      state.list = action.payload;
    },
    getAppUser(state, action) {
      state.isLoading = false;
      state.single = action.payload;
    },
    createAppUser(state) {
      state.isLoading = false;
    },
    updateAppUser(state) {
      state.isLoading = false;
    },
    deleteAppUser(state) {
      state.isLoading = false;
    },
  },
});

export default slice.reducer;

export function searchAppUser(params: SearchAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/user/search', params);
      console.log(response);

      dispatch(slice.actions.searchAppUser(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAppUser(params: GetAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/user', { params });
      console.log(`getAppUser: ${JSON.stringify(response.data)}`);

      dispatch(slice.actions.getAppUser(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createAppUser(params: CreateAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/bu', params);
      dispatch(slice.actions.createAppUser());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateAppUser(params: UpdateAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put('/bu', params);
      dispatch(slice.actions.updateAppUser());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteAppUser(params: DeleteAppUserSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete('/bu', { params });
      dispatch(slice.actions.deleteAppUser());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
