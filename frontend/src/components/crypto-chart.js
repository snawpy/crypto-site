// React
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import * as externalApi from '../logic/external-api';


const CryptoChart = (props) => {

    const chartContainer = useRef(null);

    const [chartTimes, setChartTimes] = useState([]);
    const [chartPrices, setChartPrices] = useState([])


    useEffect(() => {
        fetchChartData();
    }, []);

    useEffect(() => {
        if (chartContainer && chartTimes && chartTimes.length > 0  && chartPrices && chartPrices.length > 0) {
            updateChart();
        }

    }, [chartTimes, chartPrices]);

    return (
        <div>
            Chart here heheh
            <div className="chart-container">
                <canvas ref={chartContainer}></canvas>
            </div>
        </div>
    )

    function fetchChartData() {
        externalApi.coinPricesForChart(props.coin).then(result => {
            // console.log(result)

            if (result && result.data && result.data.prices) {
                let times = [];
                let prices = [];
                    
                result.data.prices.forEach(priceAndTime => {
                    const time = priceAndTime[0];
                    const price = priceAndTime[1];                    
                    times.push(time);
                    prices.push(price.toFixed(2));
                });

                setChartTimes(times);
                setChartPrices(prices);

            }

        });
    }

    function updateChart() {
        const ctx = chartContainer.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: chartTimes,
                datasets: [{
                    label: '# of Votes',
                    data: chartPrices,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }


}


// CryptoChart.propTypes = {
// todo
// };


export default CryptoChart;


// function updateChart() {
//     // console.log(chartContainer.current);
//     // const ctx = chartContainer.current;
//     const ctx = chartContainer.current.getContext('2d');
//     new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }]
//             }
//         }
//     });

// }