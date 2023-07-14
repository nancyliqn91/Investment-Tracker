import axios from "axios";
import React, { useEffect, useState } from "react";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

const TickerAPI = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${baseURL}/${props.name}/range/${props.multiplier}/${props.timespan}/${props.from}/${props.to}?adjusted=true&sort=asc&limit=10&apiKey=${apiKey}`
        );
        setData(response.data.results);
      } catch (error) {
        console.error(error);
        setError("Error generating ticker");
      }
    };

    fetchData();
  }, [props]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return null; // Render loading state or return a placeholder
  }

  return (
    <React.Fragment>
      <h1>Ticker: {props.name} </h1>
      <ul>
        {data.map((stock, index) => (
          <li key={index}>
            <p>open price: {stock.o}</p>
            <p>close price: {stock.c}</p>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default TickerAPI;