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

    if (isNaN(req.body.value)) {
        res.status(400)
        throw new Error('Value field must be a number')
    }

    const transaction = await Transaction.create({
        value: req.body.value,
        user: req.user.id,
    })

    res.status(200).json(transaction)
})

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.find({user: req.user.id})

    if (!transaction) {
        res.status(400)
        throw new Error('Transaction not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the transaction user
    if(transaction.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await transaction.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTransactions,
    setTransaction,
    deleteTransaction,
}