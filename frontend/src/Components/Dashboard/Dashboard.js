import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import PieChart from '../Chart/PieChart';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import axios from 'axios';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const defaultOptions = {
        reverse: false, max: 15, perspective: 1000, scale: 1.02, speed: 1000, transition: true, axis: null, reset: true, easing: "cubic-bezier(.03,.98,.52,.99)",
    }

    return (
        <DashboardStyled>
            <InnerLayout>
                <div className="stats-con">
                    <div className="chart-con">
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "100%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ height: '100%' }}
                        >
                            <Chart />
                        </motion.div>

                        <div className="amount-con">
                            <Tilt options={defaultOptions} className="tilt-box">
                                <motion.div
                                    className="income crystal-card"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h2>Total Income</h2>
                                    <p style={{ color: '#00ffaa', textShadow: "0 0 10px rgba(0,255,170,0.5)" }}>
                                        ₹ {totalIncome()}
                                    </p>
                                </motion.div>
                            </Tilt>

                            <Tilt options={defaultOptions} className="tilt-box">
                                <motion.div
                                    className="expense crystal-card"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <h2>Total Expense</h2>
                                    <p style={{ color: '#ff0066', textShadow: "0 0 10px rgba(255,0,102,0.5)" }}>
                                        ₹ {totalExpenses()}
                                    </p>
                                </motion.div>
                            </Tilt>

                            <Tilt options={defaultOptions} className="tilt-box">
                                <motion.div
                                    className="balance crystal-card"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <h2>Total Balance</h2>
                                    <p style={{ color: '#00d0ff', textShadow: "0 0 10px rgba(0,208,255,0.5)" }}>
                                        ₹ {totalBalance()}
                                    </p>
                                </motion.div>
                            </Tilt>
                        </div>
                    </div>

                    <div className="history-con">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <History />

                            <div className="pie-chart-con">
                                <PieChart />
                            </div>

                            { }
                            <div className="salary-item crystal-card income-glow">
                                <div className="salary-info">
                                    <p>Min Income</p>
                                    <span>₹{Math.min(...incomes.map(item => item.amount))}</span>
                                </div>
                                <div className="salary-info">
                                    <p>Max Income</p>
                                    <span>₹{Math.max(...incomes.map(item => item.amount))}</span>
                                </div>
                            </div>

                            { }
                            <div className="salary-item crystal-card expense-glow">
                                <div className="salary-info">
                                    <p>Min Expense</p>
                                    <span>₹{Math.min(...expenses.map(item => item.amount))}</span>
                                </div>
                                <div className="salary-info">
                                    <p>Max Expense</p>
                                    <span>₹{Math.max(...expenses.map(item => item.amount))}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid; grid-template-columns: repeat(5, 1fr); gap: 2rem;
        
        .chart-con{
            grid-column: 1 / 4; height: 400px;
            .amount-con{
                display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-top: 2rem;
                
                .tilt-box { grid-column: span 2; height: 100%; }
                .tilt-box:last-child { grid-column: 2 / 4; }

                .crystal-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                    border-radius: 20px;
                    padding: 1rem;
                    height: 100%;
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center; 
                    align-items: center;
                    
                    h2 { color: rgba(255, 255, 255, 0.9); font-size: 1.1rem; }
                    p { font-size: 3rem; font-weight: 700; }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            
            .pie-chart-con {
                margin: 2rem 0;
                height: 300px; 
                width: 100%;
                display: flex; justify-content: center; align-items: center;
            }

            .salary-item{
                /* Default Crystal Style */
                background: rgba(255, 255, 255, 0.05);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                padding: 1rem; border-radius: 20px; 
                display: flex; justify-content: space-between; align-items: center;
                margin-bottom: 1rem;
                transition: all 0.3s ease;

                .salary-info {
                    display: flex; flex-direction: column;
                    /* Label Styling */
                    p { 
                        font-weight: 600; 
                        font-size: 0.9rem; 
                        color: rgba(255, 255, 255, 0.6); /* Soft White */
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 0.3rem;
                    }
                    /* Value Styling */
                    span { 
                        font-weight: 800; 
                        font-size: 1.6rem; 
                        color: #fff; 
                    }
                }
            }

            /* 👇 NEW: Specific Glow Styles */
            .income-glow {
                border-left: 5px solid #00ffaa; /* Green Left Border */
                &:hover {
                    box-shadow: 0 0 15px rgba(0, 255, 170, 0.3);
                    transform: translateX(5px);
                }
                .salary-info span {
                    color: #00ffaa; /* Green Text */
                    text-shadow: 0 0 10px rgba(0, 255, 170, 0.5);
                }
            }

            .expense-glow {
                border-left: 5px solid #ff0066; /* Red Left Border */
                &:hover {
                    box-shadow: 0 0 15px rgba(255, 0, 102, 0.3);
                    transform: translateX(5px);
                }
                .salary-info span {
                    color: #ff0066; /* Red Text */
                    text-shadow: 0 0 10px rgba(255, 0, 102, 0.5);
                }
            }
        }
    }
`;

export default Dashboard;