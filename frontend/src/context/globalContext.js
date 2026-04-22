import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)


    const [user, setUser] = useState(null)


    const login = async (inputs) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, inputs)
            setUser(response.data.user)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed")
        }
    }


    const signup = async (inputs) => {
        try {
            const response = await axios.post(`${BASE_URL}register`, inputs)
            alert("Registration Successful! Welcome to your Dashboard.")
            setUser(response.data.user)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || "Signup Failed")
        }
    }

    const signout = () => {
        setUser(null)
    }


    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income).catch((err) => setError(err.response.data.message))
        getIncomes()
    }
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
    }
    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => totalIncome = totalIncome + income.amount)
        return totalIncome;
    }

    const addExpense = async (income) => {
        await axios.post(`${BASE_URL}add-expense`, income).catch((err) => setError(err.response.data.message))
        getExpenses()
    }
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }
    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => totalIncome = totalIncome + income.amount)
        return totalIncome;
    }
    const totalBalance = () => totalIncome() - totalExpenses()

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))


        return history
    }

    return (
        <GlobalContext.Provider value={{
            addIncome, getIncomes, incomes, deleteIncome,
            expenses, totalIncome, addExpense, getExpenses,
            deleteExpense, totalExpenses, totalBalance,
            transactionHistory, error, setError,
            user, login, signup, signout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}