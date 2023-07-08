import React from 'react';
import './../App.css';
import Stocks from './Stocks';
import Header from './Header';
import StockControl from './StockControl';
import ToggleTheme from './ToggleTheme';

function App() {
  return (
    <React.Fragment>
      < Header/>     
      < StockControl/>
      < Stocks />

      <ToggleTheme />   
    </React.Fragment>
  );
}

export default App;
