import {
  GetReceiveVoucherRequestSchema,
  CreateReceiveVoucherRequestSchema,
  UpdateReceiveVoucherRequestSchema,
  SearchReceiveVoucherRequestSchema,
  DeleteReceiveVoucherRequestSchema,
  ReceiveVoucherRequestState,
} from '../../@types/vouchers/receiveVoucherRequest';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const initialState: ReceiveVoucherRequestState = {
  loading: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const searchReceiveVoucherRequest = createAsyncThunk<
  void,
  SearchReceiveVoucherRequestSchema
>('ReceiveVoucherRequest/search', async (params, api) => {
  const response = await axios.post('/receive-voucher-request/search', params);
  api.dispatch(slice.actions.searchReceiveVoucherRequest(response.data));
});

export const getReceiveVoucherRequest = createAsyncThunk<void, GetReceiveVoucherRequestSchema>(
  'ReceiveVoucherRequest/get',
  async (params, api) => {
    const response = await axios.get('/receive-voucher-request', { params });
    api.dispatch(slice.actions.getReceiveVoucherRequest(response.data));
  }
);

export const createReceiveVoucherRequest = createAsyncThunk<
  void,
  CreateReceiveVoucherRequestSchema
>('ReceiveVoucherRequest/create', async (params) => {
  await axios.post('/receive-voucher-request', params);
});

export const updateReceiveVoucherRequest = createAsyncThunk<
  void,
  UpdateReceiveVoucherRequestSchema
>('ReceiveVoucherRequest/update', async (params) => {
  await axios.put('/receive-voucher-request', params);
});

export const deleteMulReceiveVoucherRequest = createAsyncThunk<
  void,
  DeleteReceiveVoucherRequestSchema
>('ReceiveVoucherRequest/delete', async (params) => {
  await axios.delete('/receive-voucher-request', { data: [...params.ids] });
});

const slice = createSlice({
  name: 'ReceiveVoucherRequest',
  initialState,
  reducers: {
    searchReceiveVoucherRequest(state, action) {
      state.list = action.payload;
    },
    getReceiveVoucherRequest(state, action) {
      state.single = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createReceiveVoucherRequest.pending, (state) => {
      state.loading = 'CREATE';
    });
    builder.addCase(createReceiveVoucherRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(createReceiveVoucherRequest.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(getReceiveVoucherRequest.pending, (state) => {
      state.loading = 'GET';
    });
    builder.addCase(getReceiveVoucherRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(getReceiveVoucherRequest.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(searchReceiveVoucherRequest.pending, (state) => {
      state.loading = 'SEARCH';
    });
    builder.addCase(searchReceiveVoucherRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(searchReceiveVoucherRequest.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulReceiveVoucherRequest.pending, (state) => {
      state.loading = 'DELETE_MUL';
    });
    builder.addCase(deleteMulReceiveVoucherRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulReceiveVoucherRequest.rejected, (state) => {
      state.loading = null;
    });
  },
});

export default slice.reducer;
