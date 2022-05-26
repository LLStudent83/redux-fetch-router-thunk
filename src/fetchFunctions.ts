import {
  fetchPricesRequest, fetchPricesSuccess,
  fetchPricesFailure, changePriceSuccess,
} from './features/priceList/priceListSlice';
import { AppDispatch } from './store';

export const createThunkFetchPrices = () => async (dispatch: AppDispatch)
: Promise<any> => {
  dispatch(fetchPricesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/services`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const prices = await response.json();
    dispatch(fetchPricesSuccess({ prices }));
  } catch (err) {
    dispatch(fetchPricesFailure({ error: err.message }));
  }
};

export const createThunkDeletePrice = (id: string) => async (dispatch: AppDispatch)
:Promise<any> => {
  dispatch(fetchPricesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/services/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const prices = await response.json();
    dispatch(fetchPricesSuccess({ prices }));
  } catch (err) {
    dispatch(fetchPricesFailure({ error: err.message }));
  }
};

export const createThunkChangePrice = (id: string) => async (dispatch: AppDispatch)
: Promise<any> => {
  dispatch(fetchPricesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/services/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const changePriceData = await response.json();
    dispatch(changePriceSuccess({ changePrice: changePriceData }));
  } catch (err) {
    dispatch(fetchPricesFailure({ error: err.message }));
  }
};

type ChangePrice = {
  name: string,
  price: number,
  id: string,
  content: string,
};

export const createThunkSaveModifiedPrice = (modifiedPrice: ChangePrice) => async (
  dispatch: AppDispatch,
): Promise<any> => {
  dispatch(fetchPricesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(modifiedPrice),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const prices = await response.json();
    dispatch(fetchPricesSuccess({ prices }));
  } catch (err) {
    dispatch(fetchPricesFailure({ error: err.message }));
  }
};
