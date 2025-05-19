require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./db/db')
const transactionRouter = require('./routes/transaction.route');
const userRouter = require('./routes/user.route');

connectDB();
const corsOptions = {
    origin: 'http://localhost:5173', // <-- your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.json())
app.use('/transaction', transactionRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.json({message : "hello from server"});
})

app.listen(process.env.PORT || 4000, ()=>{
    console.log('server is running on port', process.env.PORT || 4000);
})