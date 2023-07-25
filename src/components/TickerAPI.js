import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { format } from 'date-fns';

ChartJS.register(LinearScale, CategoryScale, BarElement);
const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

const TickerAPI =(props) => {
  const [error, setError] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseURL}/${props.name}/range/${props.multiplier}/${props.timespan}/${props.from}/${props.to}?adjusted=true&sort=asc&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        }

        const responseData = await response.json();
        setChart(responseData);
      } catch (error) {
        console.error(error);
        setError("Error generating ticker");
      }
    };
    fetchData();
  }, [props]);

  if (chart === null) {
    // Render a loading state or return null while the data is being fetched
    return <div>Loading...</div>;
  }

  const data = {
    labels: chart.results.map((stock) => format(new Date(stock.t), 'MM/dd/yyyy')),
    datasets: [{
      label: 'Closing Price',
      data: chart.results.map((stock) => (stock.c)),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    },
    {
      label: 'Volume Weighted Average Price',
      data: chart.results.map((stock) => (stock.vw)),
      // type: 'line', // Use 'line' for line dataset
      // fill: false, // Optional: Set to true for a filled area between the line and x-axis
      // borderColor: 'rgba(75, 192, 192, 1)',
      // tension: 0.1 // Adjust the line curve. Set to 0 for straight lines.
    }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
              offset: true
            }
        }
    },
    legend: {
      labels:{
        fontSize: 26
      }
    }    
  };

  return (
    <React.Fragment>
      <h1>Ticker Aggregates (Bars): {props.name} </h1>
      <ul>
        <li>Ticker is the exchange symbol that this item is traded under.</li>
        <li>Ticker aggregate bars  are for a stock over a given date range in custom time sizes.</li>
      </ul>

      <ul>
        {chart.results.map((stock, index) => (
          <li key={index}>
            <p> start time of the aggregate : {format(new Date(stock.t), 'MM/dd/yyyy')}</p>  
            <p>close price: ${stock.c} | highest price: ${stock.h} | lowest price: ${stock.l} | open price: ${stock.o} | volume weighted average price: ${stock.vw}</p>
            <p>number of transactions: {stock.n} | trading volume : {stock.v}</p>   
          </li>
        ))}
      </ul>

    <div>
      <Bar
        height ={400}
        data={data}
        options={options}    
      />
    </div>
    </React.Fragment>
  );
}

export default TickerAPI;