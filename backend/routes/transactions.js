const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense, getAiAdvice } = require('../controllers/expense');

const { register, login } = require('../controllers/auth');

const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/get-ai-advice', getAiAdvice)

    .post('/register', register)
    .post('/login', login)

module.exports = router;