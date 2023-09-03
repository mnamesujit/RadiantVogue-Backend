// controllers/productController.js
const Connection = require("../../config/dbConnection");

const getProducts = async (req, res) => {
  try {
    const results = await Connection.promise().query("SELECT * FROM products");
    res.status(200).json({ products: results[0] });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPendingProducts = async (req, res) => {
  try {
    const results = await Connection.promise().query(
      'SELECT * FROM products WHERE status = "pending"'
    );
    res.status(200).json({ pendingProducts: results[0] });
  } catch (err) {
    console.error("Error fetching pending products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getApprovedProducts = async (req, res) => {
  try {
    const results = await Connection.promise().query(
      'SELECT * FROM products WHERE status = "approved"'
    );
    res.status(200).json({ pendingProducts: results[0] });
  } catch (err) {
    console.error("Error fetching pending products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    await Connection.promise().query(
      'UPDATE products SET status = "approved" WHERE product_id = ?',
      [productId]
    );
    res.status(200).json({ message: "Product approved successfully" });
  } catch (err) {
    console.error("Error approving product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProducts,
  getPendingProducts,
  getApprovedProducts,
  approveProduct
}
