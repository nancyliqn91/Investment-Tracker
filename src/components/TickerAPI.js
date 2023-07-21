import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

const TickerAPI = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseURL}/${props.name}/range/${props.multiplier}/${props.timespan}/${props.from}/${props.to}?adjusted=true&sort=asc&limit=20&apiKey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        }

        const responseData = await response.json();
        setData(responseData.results);
        setChartData(generateChartData(responseData.results));

      } catch (error) {
        console.error(error);
        setError("Error generating ticker");
      }
    };

    fetchData();
  }, [props]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  }, [chartInstance]);

  const generateChartData = (data) => {
    return {
      labels: data.map((stock) => new Date(stock.t).toLocaleDateString()),
      datasets: [
        {
          label: 'Closing Price',
          data: data.map((stock) => stock.c),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        // Add more datasets for other properties if needed
      ],
    };
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return null; 
    // Render loading state or return a placeholder
  }

  return (
    <React.Fragment>
      <h1>Ticker Aggregates (Bars): {props.name} </h1>
      <p>Explanation: Ticker is the exchange symbol that this item is traded under.</p>
      <ul>
        {data.map((stock, index) => (
          <li key={index}>
            <p>close price: {stock.c}</p>
            <p>highest price: {stock.h}</p>
            <p>lowest price: {stock.l}</p>
            <p>open price: {stock.o}</p>
            <p>trading volume : {stock.v}</p>
            <p>volume weighted average price: {stock.vw}</p>           
          </li>
        ))}
      </ul>

      <h2>Line Chart</h2>
      {/* <Line data={chartData} onElementsClick={handleChartClick} ref={(ref) => setChartInstance(ref)} /> */}
      <Line data={chartData} />
      {chartData && <Line data={chartData} />}

    </React.Fragment>
  );
};

export default TickerAPI;


