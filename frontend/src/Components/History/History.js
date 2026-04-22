import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { Tilt } from 'react-tilt';

function History() {
    const { transactionHistory } = useGlobalContext()
    const [...history] = transactionHistory()

    const defaultOptions = {
        reverse: false, max: 35, perspective: 1000, scale: 1.02, speed: 1000, transition: true, axis: null, reset: true, easing: "cubic-bezier(.03,.98,.52,.99)",
    }

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item
                return (
                    <Tilt key={_id} options={defaultOptions}>
                        <div className="history-item">
                            <p style={{
                                color: type === 'expense' ? 'red' : 'var(--color-green)',
                                textShadow: type === 'expense' ? '0 0 5px rgba(255,0,0,0.2)' : '0 0 5px rgba(0,255,0,0.2)'
                            }}>
                                {title}
                            </p>

                            <p style={{
                                color: type === 'expense' ? 'red' : 'var(--color-green)',
                                textShadow: type === 'expense' ? '0 0 5px rgba(255,0,0,0.2)' : '0 0 5px rgba(0,255,0,0.2)'
                            }}>
                                { }
                                {type === 'expense' ? `-₹${amount <= 0 ? 0 : amount}` : `+₹${amount <= 0 ? 0 : amount}`}
                            </p>
                        </div>
                    </Tilt>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    h2 {
        color: rgba(255, 255, 255, 1);
        margin-bottom: 0.5rem;
    }

    .history-item{
        background: rgba(255, 255, 255, 0.05); 
        border: 1px solid rgba(255, 255, 255, 0.2); 
        backdrop-filter: blur(10px); 
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
`;

export default History;