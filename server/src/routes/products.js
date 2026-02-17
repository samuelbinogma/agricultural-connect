const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

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

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {

    console.log('--- NEW PRODUCT UPLOAD REQUEST ---');
    console.log('Body fields:', req.body);
    console.log('File received?', !!req.file);
    if (req.file) {
        console.log('File details:', {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimetype: req.file.mimetype
        });
    } else {
        console.log('No file uploaded or multer failed');
    }

    try {
        console.log('File received:', req.file);
        console.log('Body fields:', req.body);

        const productData = {
            ...req.body,
            farmer: req.user.id,
        };

        if (req.file) {
            productData.imageUrl = `/uploads/${req.file.filename}`;
            console.log('Saving imageUrl:', productData.imageUrl);
        } else {
            console.log('No imageUrl added (no file)');
        }

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

// GET Get only the farmer's products when logged-in
router.get('/my-products', authMiddleware, async (req, res) => {
    try {
        console.log('Fetching my products for farmer:', req.user.id);

        const products = await Product.find({ farmer: req.user.id })
            .sort({ createdAt: -1 })
            .limit(20);
        
        console.log(`Found ${products.length} products`);

        res.json({
            message: 'My products fetched successfully',
            products
        });
    } catch (error) {
        console.error('Get my products error:', error);
        res.status(500).json({
            message: 'Server error while fetching products',
            error: error.message
        });
    }
});


// DELETE /Delete a product (only product owners can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found'});
        }
            
        if (product.farmer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this product'})
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;