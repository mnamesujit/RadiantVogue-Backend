const express = require('express')
const router = express.Router()
const { getProducts, addProduct, updateProduct, removeProduct } = require('../controllers/products/merchantController')
const checkAuthToken = require('../middlewares/auth')


router.get('/products/', checkAuthToken, getProducts);
router.post('/products', checkAuthToken, addProduct);
router.put('/products/:productId', checkAuthToken, updateProduct);
router.delete('/products/:productId', checkAuthToken, removeProduct);
  
module.exports = router