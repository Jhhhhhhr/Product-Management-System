const Cart = require('../models/Cart');

const upertItem = async (req, res) => {
    try {
        const userID = req.user.id;
        const { productID, quantity } = req.body;
        let cart = await Cart.findOne({ userID });
        if (cart) {
            const idx = cart.items.findIndex((item) => item.productID.toString() === productID);
            if (idx >= 0) {
                const selectedItem = cart.items[idx];
                selectedItem.quantity = quantity;
            } else {
                cart.items.push({ productID, quantity });
            }
            cart = await cart.save();
            console.log("A cart is updated. ")
            res.status(201).json(cart);
        } else {
            cart = new Cart({ userID, items: [{ productID, quantity }] });
            cart = await cart.save();
            console.log(`A new cart is created for user: ${userID}`);
            res.status(201).json(cart);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAllCartItems = async (req, res) => {
    try {
        const userID = req.user.id;
        const cart = await Cart.findOne({ userID });

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    upertItem,
    getAllCartItems,
    getAllCarts
}