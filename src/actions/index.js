import * as c from './ActionTypes';

export const getStocksSuccess = (stocks) => ({
  type: c.GET_STOCKS_SUCCESS,
  stocks
});

export const getStocksFailure = (error) => ({
  type: c.GET_STOCKS_FAILURE,
  error
});
