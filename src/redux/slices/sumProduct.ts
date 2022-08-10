import { SearchSumProductSchema, SumProductState } from '../../@types/sumProduct';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

// ----------------------------------------------------------------------

const initialState: SumProductState = {
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
  name: 'sumProduct',
  initialState,
  reducers: {
    startLoading(state, action) {
      state.loading = action.payload;
    },
    searchSumProduct(state, action) {
      state.loading = null;
      state.list = action.payload;
    },
  },
});

export default slice.reducer;

export function searchSumProduct(params: SearchSumProductSchema) {
  return async () => {
    const response = await axios.post('/product/all-warehouse', params);

    dispatch(slice.actions.searchSumProduct(response.data));
  };
}
