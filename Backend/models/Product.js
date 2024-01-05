const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'default content'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    imgURL: {
        type: String,
        default: "https://i.imgur.com/bZQg5ib.png"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity: {
        type: Number,
        default: 100
    },
    price: {
        type: Number,
        default: 250
    },
    category: {
        type: String,
        default: "Eletronics"
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
