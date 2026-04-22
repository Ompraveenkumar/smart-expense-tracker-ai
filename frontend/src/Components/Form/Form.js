import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form({ type }) {
    const { addIncome, addExpense, error, setError } = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value })
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (type === 'expense') {
            addExpense(inputState)
        } else {
            addIncome(inputState)
        }
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        })
    }

    const isExpense = type === 'expense';

    const glowColor = isExpense ? '#FF0000' : '#00ffaa';

    return (
        <FormStyled onSubmit={handleSubmit} glow={glowColor}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder={type === 'expense' ? 'Expense Title' : 'Salary Title'}
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={type === 'expense' ? 'Expense Amount' : 'Salary Amount'}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date })
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Option</option>
                    {type === 'expense' ? (
                        <>
                            <option value="education">Education</option>
                            <option value="groceries">Groceries</option>
                            <option value="health">Health</option>
                            <option value="subscriptions">Subscriptions</option>
                            <option value="takeaways">Takeaways</option>
                            <option value="clothing">Clothing</option>
                            <option value="travelling">Travelling</option>
                            <option value="housing">Housing & Rent</option>
                            <option value="other">Other</option>
                        </>
                    ) : (
                        <>
                            <option value="salary">Salary</option>
                            <option value="freelancing">Freelancing</option>
                            <option value="investments">Investments</option>
                            <option value="stocks">Stocks</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="bank">Bank Transfer</option>
                            <option value="youtube">Youtube</option>
                            <option value="other">Other</option>
                        </>
                    )}
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>

            <div className="submit-btn">
                <Button
                    name={type === 'expense' ? 'Add Expense' : 'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={glowColor}
                    color={'#fff'}
                    hColor={glowColor}
                />
            </div>
        </FormStyled>
    )
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(5px);
        color: #fff;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;

        &::placeholder { color: rgba(255, 255, 255, 0.5); }
        &:focus {
            background: rgba(255, 255, 255, 0.1);
            border-color: ${props => props.glow};
            box-shadow: 0 0 10px ${props => props.glow}40;
        }
    }

    .input-control input { width: 100%; }
    .react-datepicker-wrapper { width: 100%; }

    .selects {
        display: flex; justify-content: flex-end;
        select {
            width: 100%; color: #fff;
            &:focus, &:active { color: #fff; }
            option { background: #181b36; color: #fff; }
        }
    }

    /* 👇 UPDATED: Button styles for brighter border glow */
    .submit-btn {
        button {
            /* Add a solid border matching the glow color */
            border: 2px solid ${props => props.glow} !important;
            /* Add a baseline bright glow */
            box-shadow: 0 0 15px ${props => props.glow};
            transition: all 0.3s ease;

            &:hover { 
                background: ${props => props.glow} !important;
                /* Make the glow much brighter and wider on hover */
                box-shadow: 0 0 30px ${props => props.glow}, 0 0 10px #fff !important;
                transform: translateY(-2px);
            }

            &:active {
                 transform: translateY(0);
                 box-shadow: 0 0 15px ${props => props.glow} !important;
            }
        }
    }
    
    .error { color: #ff4d4d; animation: shake 0.5s ease-in-out; }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(5px); }
        50% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
        100% { transform: translateX(0); }
    }
`;

export default Form;