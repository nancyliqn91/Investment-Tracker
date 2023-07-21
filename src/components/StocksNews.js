import React, { useEffect, useReducer } from 'react';
import stocksReducer from '../reducers/stocks-reducer';
import { getStocksFailure, getStocksSuccess } from '../actions/index';

const initialState = {
  isLoaded: false,
  stocks: [],
  error: null
};

function StocksNews () {
  const [state, dispatch] = useReducer(stocksReducer, initialState);

  useEffect(() => {
    fetch(`https://api.polygon.io/v2/reference/news?apiKey=${process.env.REACT_APP_API_KEY}`)
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
          <h1>Stocks News</h1>
          <h2>Here is the news for you</h2>
          <ul>
            {stocks.map((stock, index) =>
              <li key={index}>
                <p>Ticker:{stock.tickers[0]}</p>
                <p>Title:{stock.title}</p>
                <p>Author:{stock.author}</p>
                <p>Published_utc_time:{stock.published_utc}</p>
                <p>Article_url:<a href={stock.article_url} target="_blank" rel="noopener noreferrer">{stock.title}</a>
                </p>            
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
}

export default StocksNews;