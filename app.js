const express = require('express');
const app = express();
const morgan = require('morgan')
const Connection = require('./config/dbConnection');



// Importing Routes
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const merchantRoutes = require("./routes/merchant")
const cartRoutes = require('./routes/cart')
const orderRoutes = require('./routes/order')

//  Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message:'Welcome to the E-commerce App'})
})


app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes)
app.use('/api/merchant', merchantRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)


module.exports = app