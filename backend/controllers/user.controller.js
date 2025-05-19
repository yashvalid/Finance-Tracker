const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(404).json({ errors: errors.array() });

    try {
        const { fullname, username, email, password } = req.body;
        console.log(fullname, username, email, password)
        const user = await User.findOne({ username });
        if (user)
            return res.status(400).json({ message: 'User alredy exists' });

        const hashedPass = await User.hashPassword(password);
        const newUser = await User.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            username,
            email,
            password: hashedPass
        })

        if (!newUser)
            return res.status(400).json({ message: 'Failed to create user' });

        return res.status(200).json({ message: 'Registration successful! login to continue' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(404).json({ errors: errors.array() });
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ message: 'Invalid username' });
        console.log(user)
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid username or password' });

        const token = await user.generateAuthToken();
        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        console.log(token);
        if (!token)
            return res.status(401).json({ message: 'Unauthorized' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id)
        if(!user)
            return res.status(404).json({message : "User not found"});
        return res.status(200).json({message : "user found"});
    } catch (err) {
        return res.status(500).json({message : 'Internal server error'});
    }
}