const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    Tname : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    transactionType : {
        type : String,
        enum : ['income', 'expense'],
    },
    category : {
        type : String,
    },
    date : {
        type : Date,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    }
});

const Transaction = mongoose.model("transaction",transactionSchema);

module.exports = Transaction;