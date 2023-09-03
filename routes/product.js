// routes/product.js
const express = require('express');
const router = express.Router();
const {getProducts} = require('../controllers/productController');
const checkAuthToken = require('../middlewares/auth');

// routes for product-related operations
router.get('/', getProducts);

module.exports = router;
