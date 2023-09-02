const express = require('express');
const app = express();
const morgan = require('morgan')
const Connection = require('./config/dbConnection');


// Importing Routes
const userRoutes = require("./routes/userRoutes")

//  Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/api/user', userRoutes);



app.get('/', (req, res) => {
    res.status(200).json({ message:"we are good to go" })
})

module.exports = app