// routes/orders.js

const express = require('express');
const router = express.Router();
const { createOrder, } = require('../controllers/orders/orderController');
const checkAuthToken = require('../middlewares/auth');


router.use(checkAuthToken);

router.post('/', createOrder);


module.exports = router;
