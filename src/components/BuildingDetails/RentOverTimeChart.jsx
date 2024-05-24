import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    LineController
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    BarController,
    LineController
);

const RentOverTimeChart = ({ data }) => {
    const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined

    // Replace null values with 0
    // const sanitizedData = data.map(point => point ?? 0)

    // Expand y-axis extents
    const maxData = Math.max(...data)
    const axisBuffer = Math.ceil(maxData * 0.1)
    const yAxis = maxData + axisBuffer

    // Dataset handling for line chart overlay
    const lineDataPoints = [...data]
    // Handle the first point if it's null
    let firstPointNull = false
    if (lineDataPoints[0] === null) {
        const firstNotNullIndex = lineDataPoints.findIndex(point => point !== null)
        const firstNotNullValue = firstNotNullIndex !== -1 ? lineDataPoints[firstNotNullIndex] : 0
        lineDataPoints[0] = firstNotNullValue
        firstPointNull = true
    }
    // Handle the last point if it's null
    let lastPointNull = false
    if (lineDataPoints[lineDataPoints.length - 1] === null) {
        const lastNotNullIndex = lineDataPoints.slice(0, -1).reverse().findIndex(point => point !== null)
        const lastNotNullValue = lastNotNullIndex !== -1 ? lineDataPoints[lineDataPoints.length - 2 - lastNotNullIndex] : 0
        lineDataPoints[lineDataPoints.length - 1] = lastNotNullValue
        lastPointNull = true
    }

    const chartData = {
        labels: ['2018', '2019', '2020', '2021'],
        datasets: [
            {
                type: 'bar',
                label: 'Stabilized Units Over Time - Bar',
                data: data,
                backgroundColor: 'rgba(62,152,199,0.6)',
                borderColor: 'rgba(62,152,199,1)',
                borderWidth: 2,
            },
            {
                type: 'line',
                label: 'Stabilized Units Over Time - Line',
                data: lineDataPoints,
                backgroundColor: 'rgba(62,152,199,0.6)',
                borderColor: 'rgba(62,152,199,1)',
                borderWidth: 1,
                segment: {
                    borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)'),
                    borderDash: ctx => skipped(ctx, [6, 6]),
                },
                spanGaps: true,
                pointBackgroundColor: (ctx) => {
                    if ((ctx.dataIndex === lineDataPoints.length - 1 && lastPointNull) || (ctx.dataIndex === 0 && firstPointNull)) {
                        return 'rgba(204,204,204,0.2)'; // Custom color for the final assumed vertex
                    }
                    return 'rgba(62,152,199,1)'; // Default color
                },
                pointBorderColor: (ctx) => {
                    if ((ctx.dataIndex === lineDataPoints.length - 1 && lastPointNull) || (ctx.dataIndex === 0 && firstPointNull)) {
                      return 'rgba(204,204,204,1)'; // Custom color for the final assumed vertex
                    }
                    return 'rgba(62,152,199,1)'; // Default color
                },
                pointRadius: (ctx) => {
                    if ((ctx.dataIndex === lineDataPoints.length - 1 && lastPointNull) || (ctx.dataIndex === 0 && firstPointNull)) {
                      return 6; // Larger radius for the final assumed vertex
                    }
                    return 3; // Default radius
                },
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                stacked: true,
                max: yAxis,
                ticks: {
                    stepSize: 1
                }
            },
            x: {
                stacked: true,
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <Container>
            <Bar data={chartData} options={chartOptions}/>
        </Container>
    )
}

export default RentOverTimeChart