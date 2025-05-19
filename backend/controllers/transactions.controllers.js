const Transaction = require("../models/transaction.model");

module.exports.addTransaction = async (req, res) => {
    try {
        const { Tname, amount, transactionType, category } = req.body;
        const user = req.user;
        console.log(user);
        const trans = await Transaction.create({
            Tname,
            amount,
            transactionType,
            category,
            date : new Date(),
            user,
        })
        if (trans)
            return res.status(200).json({ transaction: trans });
        return res.status(400).json({ message: "Transaction not created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.deleteTransaction = async (req, res) => {
    try {
        const { _id } = req.body;
        const trans = await Transaction.deleteOne({ _id });
        if (trans.deletedCount === 0)
            return res.status(400).json({ message: "Transaction not found" });
        return res.status(200).json({ message: "transaction deleted" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.getAllTransactions = async (req, res) => {
    try {
        const user = req.user;
        const allTransactions = await Transaction.find({user});
        if(!allTransactions || allTransactions.length === 0)
            return res.status(400).json({ message: "No transactions found" });
        return res.status(200).json({ allTransactions });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.updateTransaction = async (req, res) => {
    try {
        const { _id, ...updatedTransaction } = req.body;
        console.log(_id)
        Object.keys(updatedTransaction).forEach((key) => {
            if (updatedTransaction[key] === '') {
                delete updatedTransaction[key];
            }
        });
        console.log(updatedTransaction);
        const result = await Transaction.findOneAndUpdate(
            { _id: _id },
            { $set: updatedTransaction },
            { new: true }
        );
        console.log(result);
        if (result)
            return res.status(200).json({ result });
        return res.status(400).json({ message: "Transaction not found" });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
}