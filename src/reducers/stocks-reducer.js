import * as c from '../actions/ActionTypes';

const stocksReducer = (state, action) => {
  switch (action.type) {
    case c.GET_STOCKS_SUCCESS:
      return {
        ...state, 
        isLoaded: true,
        stocks: action.stocks
      };

    case c.GET_STOCKS_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };

    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
};

export default stocksReducer;