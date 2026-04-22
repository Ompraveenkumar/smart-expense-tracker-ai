import React from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()


    const allDates = [...incomes, ...expenses].map(item => dateFormat(item.date))
    const uniqueDates = [...new Set(allDates)].sort((a, b) => {
        const dateA = a.split('/').reverse().join('');
        const dateB = b.split('/').reverse().join('');
        return dateA.localeCompare(dateB);
    })


    const incomeData = uniqueDates.map(date => {
        const total = incomes
            .filter(inc => dateFormat(inc.date) === date)
            .reduce((acc, curr) => acc + curr.amount, 0)
        return total
    })


    const expenseData = uniqueDates.map(date => {
        const total = expenses
            .filter(exp => dateFormat(exp.date) === date)
            .reduce((acc, curr) => acc + curr.amount, 0)
        return total
    })

    const data = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#00ffaa',
                barThickness: 50,
                borderRadius: 10,
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: '#ff0066',
                barThickness: 50,
                borderRadius: 10,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#fff',
                    font: { size: 14 }
                }
            },
            title: {
                display: true,
                text: 'Income vs Expenses (Daily Total)',
                color: '#fff',
                font: { size: 16 }
            },

            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += '₹ ' + context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#fff' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            y: {
                ticks: {
                    color: '#fff',

                    callback: function (value) {
                        return '₹ ' + value;
                    }
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            }
        }
    };

    return (
        <ChartStyled>
            <Bar data={data} options={options} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    /* CRYSTAL GLASS LOOK */
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    
    canvas {
        width: 100% !important;
        height: 100% !important;
    }
`;

export default Chart;