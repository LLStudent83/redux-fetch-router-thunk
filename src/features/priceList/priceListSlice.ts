import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Price = {
  id: string,
  name: string,
  price: number,
};

type InitialStateType = {
  prices?: (Price | null)[],
  changePrice?: {
    name: string,
    price: number,
    id: string,
    content: string,
  },
  loading?: boolean,
  error?: string | null,
};

const initialState: InitialStateType = {
  prices: [],
  changePrice: {
    name: '',
    price: 0,
    id: '',
    content: '',
  },
  loading: false,
  error: null,
};

export const priceListSlice = createSlice({
  name: 'priceList',
  initialState,
  reducers: {
    fetchPricesRequest: (state) => {
      state.loading = true;
      state.error = '';
    },

    fetchPricesFailure: (state, action: PayloadAction<InitialStateType>) => {
      const { error } = action.payload;
      state.loading = false;
      state.error = error;
      state.prices = [];
      state.changePrice = initialState.changePrice;
    },

    fetchPricesSuccess: (state, action:PayloadAction<InitialStateType>) => {
      const { prices } = action.payload;
      return {
        ...state, prices, loading: false, error: null,
      };
    },

    changePriceSuccess: (state, action:PayloadAction<InitialStateType>) => {
      const { changePrice } = action.payload;
      return {
        ...state, changePrice, loading: false, error: null,
      };
    },
  },
});

export const {
  fetchPricesRequest, fetchPricesSuccess,
  fetchPricesFailure, changePriceSuccess,
} = priceListSlice.actions;

export default priceListSlice.reducer;
