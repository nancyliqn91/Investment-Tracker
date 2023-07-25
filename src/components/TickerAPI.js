import React, { useEffect, useState } from "react";
import { Chart as ChartJS, BarElement} from 'chart.js';
import { Bar} from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, BarController, BarElement, TimeScale);

const BarChart =() => {

  const data = {
    labels: ["red","blue","green","yellow","purple", "orange"],
    datasets: [{
      label: '# of votes',
      data: [65, 59, 80, 81, 56, 55, 40],
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

export default BarChart;