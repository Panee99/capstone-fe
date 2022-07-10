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

export function searchBeginningVoucher(params: SearchBeginningVoucherSchema) {
  return async () => {
    const response = await axios.post('/beginning-voucher/search', params);
    dispatch(slice.actions.searchBeginningVoucher(response.data));
  };
}

export function getBeginningVoucher(params: GetBeginningVoucherSchema) {
  return async () => {
    const response = await axios.get('/beginning-voucher', { params });
    dispatch(slice.actions.getBeginningVoucher(response.data));
  };
}

export function createBeginningVoucher(params: CreateBeginningVoucherSchema) {
  return async () => {
    await axios.post('/beginning-voucher', params);
    dispatch(slice.actions.createBeginningVoucher());
  };
}

export function updateBeginningVoucher(params: UpdateBeginningVoucherSchema) {
  return async () => {
    await axios.put('/beginning-voucher', params);
    dispatch(slice.actions.updateBeginningVoucher());
  };
}

export function deleteBeginningVoucher(params: DeleteBeginningVoucherSchema) {
  return async () => {
    await axios.delete('/beginning-voucher', { data: [...params.ids] });
    dispatch(slice.actions.deleteBeginningVoucher());
  };
}
