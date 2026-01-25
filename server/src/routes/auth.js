const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
    console.log('Received registration request:', req.body);
    try {
        const { name, email, phone, password, role, farmName } = req.body;

        console.log('Éxtracted fields:', { name, email, phone, role });

        if (!name || !email || !phone || !password || !role) {
            console.log('Missing fields detected');
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        if (!['farmer', 'customer'].includes(role)) {
            console.log('Invalid role:', role);
            return res.status(400).json({ message: 'Invalid Role' });
        }

        console.log('Checking for existing user...');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Duplicate email found:', email);
            return res.status(400).json({ message: 'Email already in use' });
        }

        console.log('Creating new user...');
        const user = new User({
            name,
            email,
            phone,
            password,
            role,
            farmName: role === 'farmer' ? farmName : undefined
        });

        console.log('Saving user to database...');
        await user.save();

        // Create JWT
        console.log('User saved successfully. Generating token...');
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Sending success response');
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error.stack || error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email'});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

