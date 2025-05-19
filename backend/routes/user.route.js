const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller')

router.post('/register',
    body('fullname.firstname').notEmpty().withMessage('First name is required'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min : 6}).withMessage('Password must be at least 6 characters long'),
    userController.register
)

router.post('/login',
    body('username').notEmpty().withMessage('Username or email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    userController.login
)

router.get('/me',
    userController.getUser
)

module.exports = router;