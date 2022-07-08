import {
  GetBeginningVoucherSchema,
  CreateBeginningVoucherSchema,
  UpdateBeginningVoucherSchema,
  SearchBeginningVoucherSchema,
  DeleteBeginningVoucherSchema,
  BeginningVoucherState,
} from '../../@types/vouchers/beginningVoucher';
import { BaseLoading } from '../../@types/generic';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';

const DEFAULT_PAGE_SIZE = 5;

// ----------------------------------------------------------------------

const initialState: BeginningVoucherState = {
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
  name: 'beginningVoucher',
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
    searchBeginningVoucher(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
    getBeginningVoucher(state, action) {
      state.loading = null;
      state.single = action.payload;
    },
    createBeginningVoucher(state) {
      state.loading = null;
    },
    updateBeginningVoucher(state) {
      state.loading = null;
    },
    deleteBeginningVoucher(state) {
      state.loading = null;
    },
    deleteMulBeginningVoucher(state) {
      state.loading = null;
    },
  },
});

export default slice.reducer;
export const { hasError, clearError } = slice.actions;

export function searchBeginningVoucher(params: SearchBeginningVoucherSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.SEARCH));
    const response = await axios.post('/beginning-voucher/search', params);

    dispatch(slice.actions.searchBeginningVoucher(response.data));
  };
}

export function getBeginningVoucher(params: GetBeginningVoucherSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.GET));
    const response = await axios.get('/beginning-voucher', { params });
    console.log(response.data);

    dispatch(slice.actions.getBeginningVoucher(response.data));
  };
}

export function createBeginningVoucher(params: CreateBeginningVoucherSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.CREATE));
    await axios.post('/beginning-voucher', params);
    dispatch(slice.actions.createBeginningVoucher());
  };
}

export function updateBeginningVoucher(params: UpdateBeginningVoucherSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.UPDATE));
    await axios.put('/beginning-voucher', params);
    dispatch(slice.actions.updateBeginningVoucher());
  };
}

export function deleteBeginningVoucher(params: DeleteBeginningVoucherSchema) {
  return async () => {
    dispatch(slice.actions.startLoading(BaseLoading.DELETE));
    await axios.delete('/beginning-voucher', { data: [...params.ids] });
    dispatch(slice.actions.deleteBeginningVoucher());
  };
}
