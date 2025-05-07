require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db')
const transactionRouter = require('./routes/transaction.route');
const cors = require('cors')

connectDB();
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use('/transaction', transactionRouter);
app.get('/test', (req, res) => {
    res.json({message : "hello from server"});
})

app.listen(2000, ()=>{
    console.log('server is running on port 3000')
})