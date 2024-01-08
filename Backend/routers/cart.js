const express = require("express");
const {
    upertItem,
    getAllCarts,
    getAllCartItems,
    deleteAllCartItems,
    deleteOneCartItem
} = require("../controllers/cart");

const {
    authenticate,
} = require("../middlewares/auth")

const router = express.Router();

// api
router.get('/carts', getAllCarts);
router.post('/cart', authenticate, upertItem);
router.get('/cart', authenticate, getAllCartItems);
router.delete('/cart', authenticate, deleteAllCartItems);
router.delete('/cart/:id', authenticate, deleteOneCartItem);
module.exports = router;
