const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'farmer') {
            return res.status(403).json({message: 'Only farmers can add products' })
        }

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' })
    }
};

router.post('/', authMiddleware, async (req, res) => {
    
    try {
        const productData = {
            ...req.body,
            farmer: req.user.id,
        };

        const product = new Product(productData);
        await product.save();

        res.status(201).json({
            message: 'Product added successfully',
            product
        });
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({
            message: 'Server error while adding product',
            error: error.message
        });
    }
});

module.exports = router;