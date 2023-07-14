import axios from "axios";
import PropTypes from "prop-types";
import React from "react";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

const generateTicker = async (props) => {
  try {
    const { ticker } = props; 

    const response = await axios.post(
      `${baseURL}/${props.name}/range/${props.multiplier}/${props.timespan}/${props.from}/${props.to}?adjusted=true&sort=asc&limit=10&apiKey=${apiKey}`);

    return (
        <React.Fragment>
          <h1>Ticker: {props.name} </h1>
          <ul>
            {response.data.results.map((stock, index) =>
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
  catch (error) {
    console.error(error);
    throw new Error("Error generating ticker");
  }
}

generateTicker.propTypes = {
  ticker: PropTypes.object
};

export default generateTicker
