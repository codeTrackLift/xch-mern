import axios from 'axios'

const API_URL = '/api/transactions/'

// Create new transaction
const createTransaction = async (transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, transactionData, config)

    return response.data
}

// Get user transactions
const getTransactions = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Update user transaction
const updateTransaction = async (transactionId, transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.put(API_URL + transactionId, transactionData, config)

    return response.data
}

// Delete user transactions
const deleteTransaction = async (transactionId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + transactionId, config)

    return response.data
}

const transactionService = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
}

export default transactionService