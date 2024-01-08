const Cart = require('../models/Cart');

const upertItem = async (req, res) => {
    const userID = req.user.id;
    const { productID, quantity } = req.body;
    let cart = Cart.findOne({ userID });

    if (cart) {



    } else {
        cart = new Cart({ userID, items: [{ productID, quantity }] });
        cart = await cart.save();
        console.log(`A new cart is created for user: ${userID}`);

    }




}