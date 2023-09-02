const express = require('express');
const app = express();
const morgan = require('morgan')

//  Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.status(200).json({ message:"we are good to go" })
})

module.exports = app