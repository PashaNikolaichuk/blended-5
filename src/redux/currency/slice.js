import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchBaseCurrenty,
  fetchExchangeCurrenty,
  fetchRates,
} from './operations';

const initialState = {
  baseCurrency: '', // Початкове значення валюти
  exchangeInfo: null,
  loading: false,
  error: null,
  rates: [],
};

const currencySlices = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrenty: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBaseCurrenty.fulfilled, (state, action) => {
        state.loading = false;
        state.baseCurrency = action.payload; // Записуємо валюту у `baseCurrency`
      })
      .addCase(fetchExchangeCurrenty.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeInfo = action.payload;
      })

      .addCase(fetchRates.fulfilled, (state, action) => {
        state.loading = false;
        state.rates = action.payload;
      })

      .addMatcher(
        isAnyOf(
          fetchBaseCurrenty.pending,
          fetchExchangeCurrenty.pending,
          fetchRates.pending,
        ),
        state => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchBaseCurrenty.rejected,
          fetchExchangeCurrenty.rejected,
          fetchRates.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      );
  },
});

export const currencyReducer = currencySlices.reducer;

export const { setBaseCurrenty } = currencySlices.actions;
