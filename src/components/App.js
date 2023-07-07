import React from 'react';
import './../App.css';
import Stocks from './StockControl';
import Header from './Header';
import ToggleTheme from './ToggleTheme';

function App() {
  return (
    <React.Fragment>
      < Header/>
      < Stocks />
      <ToggleTheme />   

    </React.Fragment>
  );
}

export default App;
