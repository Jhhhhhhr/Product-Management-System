const express = require("express");
const {
    getProductsByOwner,
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product");
const {
    authenticate,
    isAdmin,
    isOwner
} = require("../middlewares/auth")

const router = express.Router();

// api/products
router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.get('/owner/:id', getProductsByOwner);
router.post('/', authenticate, isAdmin, createProduct);
router.put('/:id', authenticate, isAdmin, isOwner, updateProduct);
router.delete('/:id', authenticate, isAdmin, isOwner, deleteProduct);

module.exports = router;
