const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },

    unit: {
        type: String,
        enum: ['kg', 'piece', 'bunch', 'crate', 'basket'],
        default: 'kg'
    },

    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: 1
    },

    category: {
        type: String,
        enum: ['vegetables', 'fruits', 'tubers', 'grains', 'others'],
        required: true
    },

    imageUrl: {
        type: String, 
        default: ''
    },

    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}
});

productSchema.pre('save', async function() { 
    this.updatedAt = Date.now(); 
});

module.exports = mongoose.model('Product', productSchema);