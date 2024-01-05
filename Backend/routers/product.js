const express = require("express");
const {
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/product");


const router = express.Router();

// api/products
router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getOneProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
