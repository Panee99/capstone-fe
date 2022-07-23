import {
  GetBeginningVoucherSchema,
  CreateBeginningVoucherSchema,
  UpdateBeginningVoucherSchema,
  SearchBeginningVoucherSchema,
  DeleteBeginningVoucherSchema,
  BeginningVoucherState,
} from '../../@types/vouchers/beginningVoucher';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

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

export const searchBeginningVoucher = createAsyncThunk<void, SearchBeginningVoucherSchema>(
  'beginningVoucher/search',
  async (params, api) => {
    const response = await axios.post('/beginning-voucher/search', params);
    api.dispatch(slice.actions.searchBeginningVoucher(response.data));
  }
);

export const getBeginningVoucher = createAsyncThunk<void, GetBeginningVoucherSchema>(
  'beginningVoucher/get',
  async (params, api) => {
    const response = await axios.get('/beginning-voucher', { params });
    api.dispatch(slice.actions.getBeginningVoucher(response.data));
  }
);

export const createBeginningVoucher = createAsyncThunk<void, CreateBeginningVoucherSchema>(
  'beginningVoucher/create',
  async (params) => {
    await axios.post('/beginning-voucher', params);
  }
);

export const updateBeginningVoucher = createAsyncThunk<void, UpdateBeginningVoucherSchema>(
  'beginningVoucher/update',
  async (params) => {
    await axios.put('/beginning-voucher', params);
  }
);

export const deleteMulBeginningVoucher = createAsyncThunk<void, DeleteBeginningVoucherSchema>(
  'beginningVoucher/delete',
  async (params) => {
    await axios.delete('/beginning-voucher', { data: [...params.ids] });
  }
);

const slice = createSlice({
  name: 'beginningVoucher',
  initialState,
  reducers: {
    searchBeginningVoucher(state, action) {
      state.list = action.payload;
    },
    getBeginningVoucher(state, action) {
      state.single = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createBeginningVoucher.pending, (state) => {
      state.loading = 'CREATE';
    });
    builder.addCase(createBeginningVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(createBeginningVoucher.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(getBeginningVoucher.pending, (state) => {
      state.loading = 'GET';
    });
    builder.addCase(getBeginningVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(getBeginningVoucher.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(searchBeginningVoucher.pending, (state) => {
      state.loading = 'SEARCH';
    });
    builder.addCase(searchBeginningVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(searchBeginningVoucher.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulBeginningVoucher.pending, (state) => {
      state.loading = 'DELETE_MUL';
    });
    builder.addCase(deleteMulBeginningVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulBeginningVoucher.rejected, (state) => {
      state.loading = null;
    });
  },
});

export default slice.reducer;
