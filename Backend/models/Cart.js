const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
},
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
