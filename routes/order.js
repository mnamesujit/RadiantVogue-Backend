// routes/orders.js

const express = require('express');
const router = express.Router();
const { createOrder, getOrderById } = require('../controllers/orders/orderController');
const checkAuthToken = require('../middlewares/auth');


router.use(checkAuthToken);

router.post('/', createOrder);
router.get('/:orderId', getOrderById);


module.exports = router;
