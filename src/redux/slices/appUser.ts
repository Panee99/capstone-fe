import { createSlice } from '@reduxjs/toolkit';
import { AppUserState, SearchAppUserSchema } from 'src/@types/appUser';
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
    getBusinessUnit(state, action) {
      state.isLoading = false;
      state.single = action.payload;
    },
    createBusinessUnit(state) {
      state.isLoading = false;
    },
    updateBusinessUnit(state) {
      state.isLoading = false;
    },
    deleteBusinessUnit(state) {
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
      dispatch(slice.actions.getBusinessUnit(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createBusinessUnit(params: CreateBusinessUnitSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/bu', params);
      dispatch(slice.actions.createBusinessUnit());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateBusinessUnit(params: UpdateBusinessUnitSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put('/bu', params);
      dispatch(slice.actions.updateBusinessUnit());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteBusinessUnit(params: DeleteBusinessUnitSchema) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete('/bu', { params });
      dispatch(slice.actions.deleteBusinessUnit());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
