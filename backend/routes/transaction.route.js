const express = require('express');
const Transaction = require('../models/transaction.model');
const router = express.Router();
const transactionController = require('../controllers/transactions.controllers')

router.post('/add',
    transactionController.addTransaction
);

router.post('/delete', 
    transactionController.deleteTransaction
)

router.get('/all', 
    transactionController.getAllTransactions
)

router.post('/update', 
    transactionController.updateTransaction
)
module.exports = router;
