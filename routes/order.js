// routes/orders.js

const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, updateOrderStatus, deleteOrder, getOrdersByCustomer } = require('../controllers/orders/orderController');
const checkAuthToken = require('../middlewares/auth');


router.use(checkAuthToken);

router.post('/', createOrder);
router.get('/:orderId', getOrderById);
router.get('/', getOrdersByCustomer);

router.put('/:orderId/', updateOrderStatus);
router.delete('/:orderId', deleteOrder);


module.exports = router;
