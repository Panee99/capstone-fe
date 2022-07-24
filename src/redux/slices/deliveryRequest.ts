import {
  GetDeliveryRequestSchema,
  CreateDeliveryRequestSchema,
  UpdateDeliveryRequestSchema,
  SearchDeliveryRequestSchema,
  DeleteDeliveryRequestSchema,
  DeliveryRequestState,
} from '../../@types/vouchers/deliveryRequest';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

const initialState: DeliveryRequestState = {
  loading: null,
  list: {
    items: [],
    totalRows: 0,
  },
  single: null,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
};

export const searchDeliveryRequest = createAsyncThunk<void, SearchDeliveryRequestSchema>(
  'delivery-request-voucher/search',
  async (params, api) => {
    const response = await axios.post('/delivery-request-voucher/search', params);
    api.dispatch(slice.actions.searchDeliveryRequest(response.data));
  }
);

export const getDeliveryRequest = createAsyncThunk<void, GetDeliveryRequestSchema>(
  'delivery-request-voucher/get',
  async (params, api) => {
    const response = await axios.get('/delivery-request-voucher', { params });
    api.dispatch(slice.actions.getDeliveryRequest(response.data));
  }
);

export const createDeliveryRequest = createAsyncThunk<void, CreateDeliveryRequestSchema>(
  'delivery-request-voucher/create',
  async (params) => {
    await axios.post('/delivery-request-voucher', params);
  }
);

export const updateDeliveryRequest = createAsyncThunk<void, UpdateDeliveryRequestSchema>(
  'delivery-request-voucher/update',
  async (params) => {
    await axios.put('/delivery-request-voucher', params);
  }
);

export const deleteMulDeliveryRequest = createAsyncThunk<void, DeleteDeliveryRequestSchema>(
  'delivery-request-voucher/delete',
  async (params) => {
    await axios.delete('/delivery-request-voucher', { data: [...params.ids] });
  }
);

const slice = createSlice({
  name: 'delivery-request-voucher',
  initialState,
  reducers: {
    searchDeliveryRequest(state, action) {
      state.list = action.payload;
    },
    getDeliveryRequest(state, action) {
      state.single = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createDeliveryRequest.pending, (state) => {
      state.loading = 'CREATE';
    });
    builder.addCase(createDeliveryRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(createDeliveryRequest.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(getDeliveryRequest.pending, (state) => {
      state.loading = 'GET';
    });
    builder.addCase(getDeliveryRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(getDeliveryRequest.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(searchDeliveryRequest.pending, (state) => {
      state.loading = 'SEARCH';
    });
    builder.addCase(searchDeliveryRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(searchDeliveryRequest.rejected, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulDeliveryRequest.pending, (state) => {
      state.loading = 'DELETE_MUL';
    });
    builder.addCase(deleteMulDeliveryRequest.fulfilled, (state) => {
      state.loading = null;
    });
    builder.addCase(deleteMulDeliveryRequest.rejected, (state) => {
      state.loading = null;
    });
  },
});

export default slice.reducer;
