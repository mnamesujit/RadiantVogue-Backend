const Connection = require("../../config/dbConnection");

const addProduct = async (req, res) => {
  // Check if the user is authenticated and has the "Merchant" role
  if (req.user && req.user.user_type === "Merchant") {
    try {
      const { title, description, selling_price, discount, quantity_available } =
        req.body;

      // Insert the new product into the database
      const [result] = await Connection.promise().query(
        "INSERT INTO products (merchant_id, title, description, selling_price, discount, quantity_available) VALUES (?, ?, ?, ?, ?, ?)",
        [
          req.user.user_id, // Merchant id
          title,
          description,
          selling_price,
          discount,
          quantity_available,
        ]
      );

      // Return the newly inserted product ID
      res.status(201).json({ productId: result.insertId });
    } catch (err) {
      console.error("Error adding product:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // User is not authorized to add products
    res
      .status(403)
      .json({ message: "You are not authorized to add products." });
  }
};

const updateProduct = async (req, res) => {
  // Checking if the user is authenticated and has the "Merchant" role
  if (req.user && req.user.user_type === "Merchant") {
    try {
      const productId = req.params.productId;
      const { title, description, selling_price, discount, quantity_available } =
        req.body;

      // Update the product in the database
      const [result] = await Connection.promise().query(
        "UPDATE products SET title = ?, description = ?, selling_price = ?, discount = ?, quantity_available = ? WHERE product_id = ? AND merchant_id = ?",
        [ 
          title,
          description,
          selling_price,
          discount,
          quantity_available,
          productId,
          req.user.user_id, // Merchant id
        ]
      );

      // Check if the product was updated successfully
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Product updated successfully" });
      } else {
        res
          .status(404)
          .json({
            message:
              "Product not found or you are not authorized to update it.",
          });
      }
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // User is not authorized to update products
    res
      .status(403)
      .json({ message: "You are not authorized to update products." });
  }
};

const removeProduct = async (req, res) => {
  // Check if the user is authenticated and has the "Merchant" role
  if (req.user && req.user.user_type === "Merchant") {
    try {
      const productId = req.params.productId;

      // Delete the product from the database
      const [result] = await Connection.promise().query(
        "DELETE FROM products WHERE product_id = ? AND merchant_id = ?",
        [productId, req.user.user_id]
      );

      // Check if the product was deleted successfully
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Product deleted successfully" });
      } else {
        res
          .status(404)
          .json({
            message:
              "Product not found or you are not authorized to delete it.",
          });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // User is not authorized to delete products
    res
      .status(403)
      .json({ message: "You are not authorized to delete products." });
  }
};


module.exports = {
  addProduct,
  updateProduct,
  removeProduct
}