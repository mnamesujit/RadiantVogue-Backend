// controllers/productController.js
const Connection = require("../config/dbConnection");

const getProducts = async (req, res) => {
  try {
    const results = await Connection.promise().query("SELECT * FROM products");
    res.status(200).json({ products: results[0] });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getProducts,
}
