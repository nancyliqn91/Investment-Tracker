import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
    <h1 class="header">Welcome to Investment Tracker!</h1>
    <h3 class="header">🌰 You are welcome to search and track your stocks and coins! 🌰</h3>
    <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link to="/stocks">Stocks</Link>
        </li>
        <li>
          <Link to="/chatGPT">chatGPT</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;