import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import dashboardData from '../../data/dashboardData.json';

const SalesComparison = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const currentDate = new Date('2025-09-06');
        const currentMonth = currentDate.getMonth();
        const previousMonth = currentMonth - 1 >= 0 ? currentMonth - 1 : 11;

        const salesMonthData = dashboardData.salesMonth;
        const dates = Object.keys(salesMonthData);
        const salesValues = Object.values(salesMonthData);
        const currentMonthData = {};
        const previousMonthData = {};

        dates.forEach((date, index) => {
            const [day, month, year] = date.split('/').map(Number);
            const dateObj = new Date(year, month - 1, day);


            if (month === 9) {

                currentMonthData[day] = salesValues[index];
            }

            else if (month === 8) {

                previousMonthData[day] = salesValues[index];
            }
        });


        const daysInMonth = 31;
        const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);


        const currentMonthValues = labels.map(day => currentMonthData[day] || null);
        const previousMonthValues = labels.map(day => previousMonthData[day] || null);

        const data = {
            labels: labels.map(day => day.toString()),
            datasets: [
                {
                    label: 'Vendas Setembro/2025',
                    data: currentMonthValues,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1,
                    tension: 0.4
                },
                {
                    label: 'Vendas Agosto/2025',
                    data: previousMonthValues,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    tension: 0.4
                }
            ]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Quantidade vendida'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Dia do mês'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Comparativo de Vendas: Mês Atual vs. Mês Anterior'
                },
                tooltip: {
                    callbacks: {
                        title: function (tooltipItem) {
                            const dayOfMonth = tooltipItem[0].label;
                            const monthName = tooltipItem[0].datasetIndex === 0 ? 'Setembro' : 'Agosto';
                            return `${dayOfMonth}/${monthName}/2025`;
                        }
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} style={{ height: '400px' }} />
        </div>
    );
};

export default SalesComparison;
