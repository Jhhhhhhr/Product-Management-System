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
        const cart = await Cart.findOne({ userID }).populate('items.productID');

        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate('items.productID');
        res.status(200).json(carts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteAllCartItems = async (req, res) => {
    try {
        const userID = req.user.id;
        let cart = await Cart.findOne({ userID });
        if (!cart) {
            res.status(200).json(cart);
        } else {
            cart.items = [];
            cart = await cart.save();
            res.status(200).json(cart);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const deleteOneCartItem = async (req, res) => {
    try {
        const userID = req.user.id;
        const productID = req?.params?.id;

        if (!productID) {
            res.status(401).json({ message: "product id is not provided" });
            return;
        }

        let cart = await Cart.findOne({ userID });
        if (!cart) {
            res.status(401).json({ message: "The user doesn't have a cart." });
            return;
        } else {
            const idx = cart.items.findIndex((item) => item.productID.toString() === productID);
            if (idx < 0) {
                res.status(401).json({ message: "Item doesn't exist in this cart." });
                return;
            } else {
                cart.items.splice(idx, 1);
                cart = await cart.save();
                console.log("A cart item is deleted");
                res.status(200).json(cart);
                return;
            }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
        return;
    }
}


module.exports = {
    upertItem,
    getAllCartItems,
    getAllCarts,
    deleteAllCartItems,
    deleteOneCartItem
}