import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Bar} from 'react-chartjs-2';
import { format } from 'date-fns';

ChartJS.register(LinearScale, CategoryScale, BarElement);

const TickerAPI =(props) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const baseURL = "https://api.polygon.io/v2/aggs/ticker";
  // const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseURL}/${props.name}/range/${props.multiplier}/${props.timespan}/${props.from}/${props.to}?adjusted=true&sort=asc&limit=20&apiKey=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request failed with status code " + response.status);
        }

        const responseData = await response.json();
        setChart(responseData);
        // setChartData(generateChartData(responseData.results));
      } catch (error) {
        console.error(error);
        setError("Error generating ticker");
      }
    };
    fetchData();
  }, [props]);


  const data = {
    labels: chart.results.map((stock) => format(new Date(stock.t), 'MM/dd/yyyy')),
    datasets: [{
      label: '{chart.results.count} Aggregates Available',
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
    }]

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
    <div>
      <Bar
        height ={400}
        data={data}
        options={options}    
      />
    </div>
  );
}

export default TickerAPI;