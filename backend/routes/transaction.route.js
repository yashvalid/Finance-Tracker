const express = require('express');
const Transaction = require('../models/transaction.model');
const router = express.Router();
const authentication = require('../middleware/authentication');
const transactionController = require('../controllers/transactions.controllers')

router.post('/add',
    authentication.authUser,
    transactionController.addTransaction
);

router.post('/delete', 
    authentication.authUser,
    transactionController.deleteTransaction
)

router.get('/all', 
    authentication.authUser,
    transactionController.getAllTransactions
)

router.post('/update', 
    authentication.authUser,
    transactionController.updateTransaction
)
module.exports = router;
