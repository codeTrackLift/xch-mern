const asyncHandler = require('express-async-handler')

const Transaction = require('../models/transactionModel')
const User = require('../models/userModel')

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: 'desc' })

    res.status(200).json(transactions)
})

// @desc    Set transaction
// @route   POST /api/transactions
// @access  Private
const setTransaction = asyncHandler(async (req, res) => {
    if (!req.body.value) {
        res.status(400)
        throw new Error('Please add a value field')
    }

    const transaction = await Transaction.create({
        value: req.body.value,
        user: req.user.id,
    })

    res.status(200).json(transaction)
})

module.exports = {
    getTransactions,
    setTransaction,
}