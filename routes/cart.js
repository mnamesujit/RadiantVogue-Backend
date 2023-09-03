
const express = require('express');
const router = express.Router();
const { viewCart, addToCart, updateCartItem, removeCartItem } = require("../controllers/cart/cartController");
const checkAuthToken = require('../middlewares/auth');

router.use(checkAuthToken);

router.get('/', viewCart);
router.post('/', addToCart);
router.put('/:cartItemId', updateCartItem);
router.delete('/:cartItemId', removeCartItem);

module.exports = router;
