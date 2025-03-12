import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../service/opencagedataApi';
import { exchangeCurrency, latestRates } from '../../service/exchangeAPI';

export const fetchBaseCurrenty = createAsyncThunk(
  'currency/fetchBaseCurrenty',

  //coord це широта і довгота.
  async (coord, thunkAPI) => {
    // перевіркa, щоб тільки при першому відкритті сторінки, програма визначала поточну валюту користувача
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }

    try {
      const response = await getUserInfo(coord);
      return response.results[0].annotations.currency.iso_code; // Дістаємо код валюти
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchExchangeCurrenty = createAsyncThunk(
  'currency/fetchExchangeCurrenty',
  async (credencials, thunkAPI) => {
    try {
      const response = await exchangeCurrency(credencials);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchRates = createAsyncThunk(
  'currency/fetchRates',
  async (baseCurrency, thunkAPI) => {
    try {
      const response = await latestRates(baseCurrency);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
