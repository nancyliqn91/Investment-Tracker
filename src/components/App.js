import React from 'react';
import './../App.css';
import StocksNews from './StocksNews';
import Header from './Header';
import TickerControl from './TickerControl';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Footer from './Footer';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CustomQuestion from './CustomQuestion';
import TickerInfo from './TickerInfo';
// import ToggleTheme from './ToggleTheme';

function App() {
  return (
    <Router>
      <Header />
      <Routes>     
        <Route path="/" element={<TickerControl />} />
        <Route path="/news" element={<StocksNews />} />   
        <Route path="/tickerInfo" element={<TickerInfo />} />     
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <br/>
      <br/>
      <CustomQuestion/>
      <Footer />     
    </Router>
  );
}

export default App;
