const ExpenseSchema = require("../models/Expense")
const fetch = require('node-fetch');

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body
    const income = ExpenseSchema({ title, amount, category, description, date })

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await income.save()
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getExpense = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Expense Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}


exports.getAiAdvice = async (req, res) => {
    try {

        const { totalIncome, totalExpense, balance, question } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        console.log("🤖 AI Requested! Generating Automatic Spending Advice...");

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        const requestBody = {
            contents: [{
                parts: [{

                    text: `You are a professional Financial Advisor. 
    
                    USER DATA:
                    - Monthly Income: $${totalIncome}
                    - Monthly Expenses: $${totalExpense}
                    - Current Balance: $${balance}

                    TASK:
                    1. Analyze the current spending vs income (currently at $${totalIncome} income).
                    2. Provide a "Next Month Budget Plan" using the 50/30/20 rule.
                    3. If the user asked a specific question: "${question}", answer it first.
                    4. Keep the tone professional and encouraging.`
                }]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();


        if (!response.ok) {
            console.error("❌ Google Error Details:", data);
            return res.status(200).json({
                advice: "You're doing a great job tracking your $${totalExpense} in expenses! Keep maintaining your balance."
            });
        }


        const advice = data.candidates[0].content.parts[0].text;
        res.status(200).json({ advice });

    } catch (error) {
        console.error("AI System Error:", error);
        res.status(500).json({ message: "AI System Error" });
    }
};