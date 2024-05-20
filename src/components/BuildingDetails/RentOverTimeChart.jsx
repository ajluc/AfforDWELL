import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const RentOverTimeChart = ({ data }) => {
    // Replace null values with 0
    const sanitizedData = data.map(point => point ?? 0)

    const chartData = {
        labels: ['2018', '2019', '2020', '2021'],
        datasets: [
            {
                label: 'Stabilized Units Over Time',
                data: sanitizedData,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Container>
            <Bar data={chartData} />
        </Container>
    )
}

export default RentOverTimeChart