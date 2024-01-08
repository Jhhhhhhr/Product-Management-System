const express = require("express");
const {
    upertItem,
    getAllCarts,
    getAllCartItems
} = require("../controllers/cart");

const {
    authenticate,
} = require("../middlewares/auth")

const router = express.Router();

// api
router.get('/carts', getAllCarts);
router.post('/cart', authenticate, upertItem);
router.get('/cart', authenticate, getAllCartItems);

module.exports = router;
