import {
  GetDeliveryVoucherSchema,
  CreateDeliveryVoucherSchema,
  UpdateDeliveryVoucherSchema,
  SearchDeliveryVoucherSchema,
  DeleteDeliveryVoucherSchema,
  DeliveryVoucherState,
} from '../../@types/vouchers/deliveryVoucher';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const initialState: DeliveryVoucherState = {
  loading: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const searchDeliveryVoucher = createAsyncThunk<void, SearchDeliveryVoucherSchema>(
  'delivery-voucher/search',
  async (params, api) => {
    const response = await axios.post('/delivery-voucher/search', params);
    api.dispatch(slice.actions.searchDeliveryVoucher(response.data));
  }
);

export const getDeliveryVoucher = createAsyncThunk<void, GetDeliveryVoucherSchema>(
  'delivery-voucher/get',
  async (params, api) => {
    const response = await axios.get('/delivery-voucher', { params });
    api.dispatch(slice.actions.getDeliveryVoucher(response.data));
  }
);

export const createDeliveryVoucher = createAsyncThunk<void, CreateDeliveryVoucherSchema>(
  'delivery-voucher/create',
  async (params) => {
    await axios.post('/delivery-voucher', params);
  }
);

export const updateDeliveryVoucher = createAsyncThunk<void, UpdateDeliveryVoucherSchema>(
  'delivery-voucher/update',
  async (params) => {
    await axios.put('/delivery-voucher', params);
  }
);

export const deleteMulDeliveryVoucher = createAsyncThunk<void, DeleteDeliveryVoucherSchema>(
  'delivery-voucher/delete',
  async (params) => {
    await axios.delete('/delivery-voucher', { data: [...params.ids] });
  }
);

const slice = createSlice({
  name: 'delivery-voucher',
  initialState,
  reducers: {
    searchDeliveryVoucher(state, action) {
      state.list = action.payload;
    },
    getDeliveryVoucher(state, action) {
      state.single = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createDeliveryVoucher.pending, (state) => {
      state.loading = 'CREATE';
    });
    builder.addCase(createDeliveryVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(createDeliveryVoucher.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(getDeliveryVoucher.pending, (state) => {
      state.loading = 'GET';
    });
    builder.addCase(getDeliveryVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(getDeliveryVoucher.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(searchDeliveryVoucher.pending, (state) => {
      state.loading = 'SEARCH';
    });
    builder.addCase(searchDeliveryVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(searchDeliveryVoucher.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulDeliveryVoucher.pending, (state) => {
      state.loading = 'DELETE_MUL';
    });
    builder.addCase(deleteMulDeliveryVoucher.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulDeliveryVoucher.rejected, (state) => {
      state.loading = null;
    });
  },
});

export default slice.reducer;
