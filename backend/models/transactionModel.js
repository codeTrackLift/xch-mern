const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text: {
            type: Number,
            required: [true, 'Please enter a value'],
        },
    }, 
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Transaction', transactionSchema)