const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        default: Date.now,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema);