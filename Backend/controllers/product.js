const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        console.log(`create a new product: ${product}`);
        if (!product.name) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params?.id);
        console.log(`retrive one product: ${product}`);
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params?.id, req.body, { new: true });
        console.log(`Update product(${req.params?.id}): ${product}`);
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params?.id);
        console.log(`Delete product(${req.params?.id})!`);
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
};