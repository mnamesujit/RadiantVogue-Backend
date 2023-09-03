// routes/product.js
const express = require('express');
const router = express.Router();
const {getProducts, getPendingProducts, getApprovedProducts, approveProduct} = require('../controllers/productController');
const checkAuthToken = require('../middlewares/auth');

// routes for product-related operations
router.get('/', getProducts);
router.get('/pending-products', checkAuthToken, getPendingProducts);
router.get('/approved-products', checkAuthToken, getApprovedProducts);
router.post('/approve-product/:productId', checkAuthToken, approveProduct);

module.exports = router;
