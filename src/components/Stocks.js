import React, { useEffect, useReducer } from 'react';
import stocksReducer from '../reducers/stocks-reducer';
import { getStocksFailure, getStocksSuccess } from '../actions/index';

const initialState = {
  isLoaded: false,
  stocks: [],
  error: null
};

function Stocks () {
  const [state, dispatch] = useReducer(stocksReducer, initialState);

  useEffect(() => {
    fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-07-07?adjusted=true&sort=asc&limit=10&apiKey=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        const action = getStocksSuccess(jsonifiedResponse.results)
        dispatch(action);
        })
      .catch((error) => {
        const action = getStocksFailure(error.message)
        dispatch(action);
      });
    }, [])

    const { error, isLoaded, stocks } = state;

    if (error) {
      return <h1>Error: {error}</h1>;
    } 
    else if (!isLoaded) {
      return <h1>...Loading...</h1>;
    } 
    else {
      return (
        <React.Fragment>
          <h1>Stocks </h1>
          <ul>
            {stocks.map((stock, index) =>
              <li key={index}>
                {/* <h3>Ticker:{stock.ticker}</h3> */}
                <p>open price:{stock.o}</p>
                <p>close price:{stock.c}</p>
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
}

export default Stocks;