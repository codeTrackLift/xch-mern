const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getTransactions, setTransaction } = require("../controllers/transactionController");

router.route('/').get(protect, getTransactions).post(protect, setTransaction);

module.exports = router;
