import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { motion } from 'framer-motion';

function Expenses() {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext()

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <ExpenseStyled>
            <InnerLayout>
                <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ color: 'white' }}>
                    Expenses
                </motion.h1>

                <motion.h2 className="total-income" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    Total Expense: <span>₹{totalExpenses()}</span>
                </motion.h2>

                <div className="income-content">
                    <motion.div className="form-container" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <Form type="expense" />
                    </motion.div>

                    { }
                    <div className="incomes">
                        {expenses.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <motion.div
                                    key={_id}

                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <IncomeItem
                                        id={_id}
                                        title={title}
                                        description={description}
                                        amount={amount}
                                        date={date}
                                        type={type}
                                        category={category}
                                        indicatorColor="red"
                                        deleteItem={deleteExpense}
                                    />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    h1 { color: white; }
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.05); 
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        color: rgba(255, 255, 255, 0.9);
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: red;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{ flex: 1; }
        .form-container {
            input, textarea, select {
                background: rgba(255, 255, 255, 0.1) !important;
                border: 2px solid #fff !important;
                color: #fff !important;
                &::placeholder { color: rgba(255, 255, 255, 0.7) !important; }
            }
            input[type="date"] { color-scheme: dark; }
            select option { background: #fff; color: #333; }
        }
    }
`;

export default Expenses;