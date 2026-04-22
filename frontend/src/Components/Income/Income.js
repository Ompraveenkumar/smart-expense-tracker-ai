import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { motion } from 'framer-motion';

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext()

    useEffect(() => {
        getIncomes()
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }
    const itemVariants = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

    return (
        <IncomeStyled>
            <InnerLayout>
                <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ color: 'white' }}>
                    Incomes
                </motion.h1>

                <motion.h2 className="total-income" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    { }
                    Total Income: <span>₹{totalIncome()}</span>
                </motion.h2>

                <div className="income-content">
                    <motion.div className="form-container" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <Form />
                    </motion.div>
                    <motion.div className="incomes" variants={containerVariants} initial="hidden" animate="show">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <motion.div key={_id} variants={itemVariants}>
                                    <IncomeItem
                                        id={_id} title={title} description={description} amount={amount} date={date} type={type} category={category}
                                        indicatorColor="var(--color-green)" deleteItem={deleteIncome}
                                    />
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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
            color: var(--color-green);
            text-shadow: 0 0 10px rgba(0, 255, 85, 0.4);
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
            button {
                box-shadow: 0px 1px 15px rgba(0,0,0,0.2);
                &:hover { background: var(--color-green) !important; }
            }
        }
    }
`;

export default Income;