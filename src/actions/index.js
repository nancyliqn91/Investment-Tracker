import * as c from './ActionTypes';

export const getStocksSuccess = (stocks) => ({
  type: c.GET_STOCKS_SUCCESS,
  stocks
});

export const getStocksFailure = (error) => ({
  type: c.GET_STOCKS_FAILURE,
  error
});

export const deleteTicker = id => ({
  type: c.DELETE_TICKER,
  id
});

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const addTicker = (ticker) => {
  const { name, multiplier, timespan, from, to, id, formattedWaitTime, timeOpen } = ticker;
  return {
    type: c.ADD_TICKER,
    name: name,
    multiplier: multiplier,
    timespan: timespan,
    from: from,
    to: to,
    id: id,
    formattedWaitTime,
    timeOpen: timeOpen
  }
}

export const updateTime = (id, formattedWaitTime) => ({
  type: c.UPDATE_TIME,
  id: id,
  formattedWaitTime: formattedWaitTime
});