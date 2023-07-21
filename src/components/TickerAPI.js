import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

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
      <ul>
        <li>Explanation: Ticker is the exchange symbol that this item is traded under.</li>
        <li>Get aggregate bars for a stock over a given date range in custom time sizes.</li>
      </ul>

      <ul>
        {data.map((stock, index) => (
          <li key={index}>
            <p>close price: {stock.c}</p>
            <p>highest price: {stock.h}</p>
            <p>lowest price: {stock.l}</p>
            <p>number of transactions: {stock.n}</p>
            <p>open price: {stock.o}</p>
            <p>trading volume : {stock.v}</p>
            <p>volume weighted average price: {stock.vw}</p>           
          </li>
        ))}
      </ul>

      <h2>Bar Chart</h2>
      {chartData && <Bar data={chartData} options={barChartOptions} ref={(ref) => setChartInstance(ref)} />}
    </React.Fragment>
  );
};

export default TickerAPI;


