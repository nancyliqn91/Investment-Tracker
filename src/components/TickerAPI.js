import React, { useEffect, useState } from "react";
import { Chart as ChartJS, Title, Tooltip, Legend, LinearScale, CategoryScale, BarController, BarElement, TimeScale} from 'chart.js';
import 'chartjs-adapter-date-fns'; 
import { Bar} from 'react-chartjs-2';
import { format } from 'date-fns';

const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";
ChartJS.register(LinearScale, CategoryScale, BarController, BarElement, TimeScale);

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
    let currentChartInstance = null;
    if (chartInstance) {
      currentChartInstance = chartInstance;
    }
    return () => {
      if (currentChartInstance) {
        currentChartInstance.destroy();
      }
    };
  }, [chartInstance]);

  const generateChartData = (data) => {
    return {
      labels: data.map((stock) => format(new Date(stock.t), 'MM/dd/yyyy')),
      datasets: [
        {
          label: 'Closing Price',
          data: data.map((stock) => stock.c),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1,
        },
        {
          label: 'Volume Weighted Average Price',
          data: data.map((stock) => stock.vw),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        
      ],
    };
  };

  const barChartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'll', 
          // Format for tooltip (e.g., "Sep 1, 2023")
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Ticker Aggregates (Bars)',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
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
        <li>Ticker is the exchange symbol that this item is traded under.</li>
        <li>Ticker aggregate bars  are for a stock over a given date range in custom time sizes.</li>
      </ul>

      <ul>
        {data.map((stock, index) => (
          <li key={index}>
            <p> start time of the aggregate : {format(new Date(stock.t), 'MM/dd/yyyy')}</p>  
            <p>close price: {stock.c} | highest price: {stock.h} | lowest price: {stock.l} | open price: {stock.o} | volume weighted average price: {stock.vw}</p>
            <p>number of transactions: {stock.n} | trading volume : {stock.v}</p>   
          </li>
        ))}
      </ul>

      <h2>Bar Chart</h2>
      {chartData && <Bar data={chartData} options={barChartOptions} ref={(ref) => setChartInstance(ref)} />}
    </React.Fragment>
  );
};

export default TickerAPI;


