import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { dateFormat } from '../../utils/dateFormat';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

function Transactions() {
    const { getIncomes, getExpenses, transactionHistory } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const history = transactionHistory()

    const defaultOptions = {
        reverse: false, max: 35, perspective: 1000, scale: 1.02, speed: 1000, transition: true, axis: null, reset: true, easing: "cubic-bezier(.03,.98,.52,.99)",
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <TransactionsStyled>
            <InnerLayout>
                <div className="header-con">
                    <h1 style={{ color: 'white' }}>Transaction History</h1>
                </div>

                <motion.div
                    className="history-container"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {history.map((item) => {
                        const { _id, title, amount, date, type } = item
                        return (
                            <motion.div key={_id} variants={itemVariants}>
                                <Tilt options={defaultOptions}>
                                    <div className="history-item">
                                        <div className="text">
                                            <h2 style={{
                                                color: type === 'expense' ? 'red' : 'var(--color-green)',
                                                textShadow: type === 'expense' ? '0 0 5px rgba(255,0,0,0.2)' : '0 0 5px rgba(0,255,0,0.2)'
                                            }}>
                                                {title}
                                            </h2>
                                            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                {dateFormat(date)}
                                            </p>
                                        </div>
                                        <div className="amount">
                                            <p style={{
                                                color: type === 'expense' ? 'red' : 'var(--color-green)',
                                                fontWeight: 'bold',
                                                fontSize: '1.5rem',
                                                textShadow: type === 'expense' ? '0 0 5px rgba(255,0,0,0.2)' : '0 0 5px rgba(0,255,0,0.2)'
                                            }}>
                                                { }
                                                {type === 'expense' ? `-₹${amount}` : `+₹${amount}`}
                                            </p>
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .history-container{
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .history-item{
        background: rgba(255, 255, 255, 0.05); 
        border: 1px solid rgba(255, 255, 255, 0.2); 
        backdrop-filter: blur(10px);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        
        padding: 1rem 2rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        color: #fff;
        cursor: pointer;
    }
`;

export default Transactions;