import React from 'react'
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'

ChartJs.register(ArcElement, Tooltip, Legend)

function PieChart() {
    const { expenses } = useGlobalContext()


    const categoryTotals = expenses.reduce((acc, curr) => {
        const { category, amount } = curr
        if (!acc[category]) {
            acc[category] = 0
        }
        acc[category] += amount
        return acc
    }, {})

    const data = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                    '#9966FF', '#FF9F40', '#2ecc71', '#e74c3c'
                ],

                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 2,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {

                    color: '#FFFFFF',
                    boxWidth: 15,
                    padding: 15,
                    font: { size: 12 }
                }
            },

            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += '₹ ' + context.parsed;
                        }
                        return label;
                    }
                }
            }
        }
    }

    return (
        <PieChartStyled>
            <h3>Expense Breakdown</h3>
            <div className="chart-container">
                <Pie data={data} options={options} />
            </div>
        </PieChartStyled>
    )
}

const PieChartStyled = styled.div`
    /* 👇 UPDATED TO CRYSTAL GLASS CSS */
    background: rgba(255, 255, 255, 0.05); /* Transparent */
    border: 1px solid rgba(255, 255, 255, 0.2); /* Glass Border */
    backdrop-filter: blur(10px); /* Blur Effect */
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    h3{
        margin-bottom: 1rem;
        text-align: center;
        /* 👇 UPDATED: Title text is now White */
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2rem;
    }
    
    .chart-container {
        height: 240px; 
        width: 100%; 
        position: relative;
    }
`;

export default PieChart;