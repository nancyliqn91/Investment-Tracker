import React, { useEffect, useState } from "react";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale} from 'chart.js';
import { Line} from 'react-chartjs-2';
import { format } from 'date-fns';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

ChartJS.register(LinearScale, CategoryScale, LineElement,PointElement);
const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = "https://api.polygon.io/v2/aggs/ticker";

const LineAPI =(props) => {
  const [error, setError] = useState(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${baseURL}/${props.name}/range/${props.multiplier}/${props.timespan}/${props.from}/${props.to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;
        // for debug
        console.log("Fetching data from:", url);
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Bad request - check the URL and parameters.");
          } else if (response.status === 429) {
            throw new Error("Too many requests. Please try again later.");
          } else {
            throw new Error("Request failed with status code " + response.status);
          }
        }

        const responseData = await response.json();
        // for debug
        console.log("Fetched data:", responseData);
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
      data: chart.results.map((stock) => (stock.vw))
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
    <Container>
    <Row>
    <Col>
    <React.Fragment>
      <div className="p-3 mb-2 bg-light bg-gradient text-dark rounded-5">
        <h1>Ticker Aggregates (Bars): {props.name} </h1>
        <ul>
          {chart.results.map((stock, index) => (
            <li key={index}>
              <p> Start Time: {format(new Date(stock.t), 'MM/dd/yyyy')}</p>  
              <p>Price: close: ${stock.c} | highest: ${stock.h} | lowest: ${stock.l} | open: ${stock.o} | volume weighted average: ${stock.vw}</p>
              <p>Transactions Number: {stock.n} | Trading Volume : {stock.v}</p>   
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Line
          height ={400}
          data={data}
          options={options}    
        />
      </div>
    </React.Fragment>
    </Col>
    </Row>
    </Container>
  );
}

export default LineAPI;