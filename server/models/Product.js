// In models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    brand: { type: String },
    price: { type: Number },
    salePrice: { type: Number },
    totalStock: { type: Number }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
