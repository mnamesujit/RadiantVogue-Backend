// db.js
const Connection = require('./dbConfig');

Connection.connect((err) => {
    if (err) console.log("Database connection failed:", err)
    else console.log("Database connected successfully");
})


module.exports = Connection;
