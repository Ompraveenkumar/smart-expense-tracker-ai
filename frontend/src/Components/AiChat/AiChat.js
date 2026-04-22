import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import axios from 'axios';
import { motion } from 'framer-motion';

function AiChat() {
    const { totalIncome, totalExpenses, totalBalance } = useGlobalContext()
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(false);
    const [userQuestion, setUserQuestion] = useState('');

    const askAi = async (e) => {
        if (e) e.preventDefault();
        setAdvice('');
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/v1/get-ai-advice', {
                totalIncome: totalIncome(),
                totalExpense: totalExpenses(),
                balance: totalBalance(),
                question: userQuestion || "Give me a full financial analysis."
            });
            setAdvice(response.data.advice);
            setUserQuestion('');
        } catch (err) {
            setAdvice("AI is currently unavailable. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AiChatStyled>
            <InnerLayout>
                <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ color: 'white' }}>
                    AI Financial Consultant
                </motion.h1>

                <div className="chat-container">
                    <motion.div className="ai-glass-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <p className="intro">
                            { }
                            Hello! I can help you plan your budget using your current <b>₹{totalIncome()}</b> income.
                        </p>

                        <div className="button-group">
                            <button className="ask-ai-btn" onClick={askAi} disabled={loading}>
                                {loading ? 'Analyzing...' : '✨ Ask AI Advisor'}
                            </button>
                        </div>

                        <form onSubmit={askAi} className="input-group">
                            <input type="text" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} placeholder="Or ask a specific question here..." disabled={loading} />
                            <button type="submit" className="send-btn" disabled={loading || !userQuestion}>Send</button>
                        </form>

                        {advice && (
                            <div className="advice-display-area">
                                <div className="advice-header">
                                    <span>🤖 AI Advisor Analysis</span>
                                    <button onClick={() => setAdvice('')}>Clear</button>
                                </div>
                                <div className="advice-content">{advice}</div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </InnerLayout>
        </AiChatStyled>
    )
}

const AiChatStyled = styled.div`
    h1 { color: #fff !important; margin-bottom: 2rem; }
    .chat-container {
        display: flex; justify-content: center;
        .ai-glass-card {
            width: 100%; max-width: 900px;
            background: rgba(255, 255, 255, 0.05); 
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(12px); border-radius: 32px; padding: 2.5rem;
            display: flex; flex-direction: column; gap: 2rem;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);

            .intro {
                color: rgba(255, 255, 255, 0.8); text-align: center; font-size: 1.2rem;
                b { color: #00ffaa; text-shadow: 0 0 10px rgba(0,255,170,0.5); }
            }

            .button-group { display: flex; justify-content: center; }
            .ask-ai-btn {
                background: linear-gradient(90deg, #222260 0%, #424290 100%);
                color: #fff; padding: 1rem 3rem; border-radius: 30px;
                border: 1px solid rgba(255, 255, 255, 0.4); font-weight: 700; font-size: 1.1rem;
                cursor: pointer; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                &:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(66, 66, 144, 0.5); }
            }

            .input-group {
                display: flex; gap: 1rem;
                input {
                    flex: 1; background: rgba(255, 255, 255, 0.1);
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    padding: 1rem 1.5rem; color: #fff; border-radius: 15px; outline: none; font-size: 1rem;
                    &::placeholder { color: rgba(255, 255, 255, 0.6); }
                    &:focus { border-color: #fff; background: rgba(255, 255, 255, 0.2); }
                }
                .send-btn {
                    background: #222260; color: #fff; padding: 0 2.5rem;
                    border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.4);
                    cursor: pointer; font-weight: 600; transition: all 0.3s ease;
                    &:hover { background: var(--color-green); transform: translateY(-2px); }
                    &:disabled { opacity: 0.5; cursor: not-allowed; }
                }
            }

            .advice-display-area {
                background: rgba(0, 0, 0, 0.3); border-radius: 20px; padding: 2rem;
                border: 1px solid rgba(255, 255, 255, 0.1); border-left: 5px solid #ff0080;
                animation: fadeIn 0.5s ease;
                .advice-header {
                    display: flex; justify-content: space-between; color: #ff0080; font-weight: 700; margin-bottom: 1rem;
                    text-shadow: 0 0 10px rgba(255, 0, 128, 0.3);
                    button { background: transparent; border: none; color: #fff; cursor: pointer; opacity: 0.6; }
                }
                .advice-content { color: rgba(255, 255, 255, 0.9); line-height: 1.8; white-space: pre-wrap; }
            }
        }
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

export default AiChat;