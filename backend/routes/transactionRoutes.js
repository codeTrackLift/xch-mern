const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");


router.route('/').get(protect, getTransactions).post(protect, setTransaction);
router.route('/:id').put(protect, updateTransaction).delete(protect, deleteTransaction);

module.exports = router;
