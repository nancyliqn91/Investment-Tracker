import React, { useEffect, useReducer } from 'react';
import stocksReducer from '../reducers/stocks-reducer';
import { getStocksFailure, getStocksSuccess } from '../actions/index';
import Card from 'react-bootstrap/Card';

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
    <Card style={{ width: '90rem' }}>
      <Card.Body>
        <Card.Title>Stocks News</Card.Title>
        <ul>
          {stocks.map((stock, index) =>
            <li key={index}>
              <Card.Subtitle className="mb-2 text-muted">Ticker:{stock.tickers[0]}</Card.Subtitle>
              <Card.Link href={stock.article_url} target="_blank" rel="noopener noreferrer">{stock.title}</Card.Link>
              <Card.Text>
              Author:{stock.author}
              </Card.Text>
              <Card.Text>
              Published_Utc_Time: {stock.published_utc}
              </Card.Text>          
            </li>
          )}
        </ul>
      </Card.Body>
    </Card>
    );
  } 
}

export default StocksNews;