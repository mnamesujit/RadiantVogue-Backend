// controllers/cartController.js
const db = require("../../config/dbConnection");

const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const { user_id } = req.user;

  try {
    // Check if the customer already has a cart
    const [cartResults] = await db
      .promise()
      .query("SELECT * FROM cart WHERE customer_id = ?", [user_id]);

    if (cartResults.length === 0) {
      // Customer does not have a cart, create one
      const [insertResults] = await db
        .promise()
        .query("INSERT INTO cart (customer_id) VALUES (?)", [user_id]);
        console.log("++++++++++++++++++++++++++")
      const cart_id = insertResults.insertId; // inserId is predefined and comes from resultHeader
      // Add the product to the cart_items table
      await db
        .promise()
        .query(
          "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
          [cart_id, product_id, quantity]
        );

      res.status(201).json({ message: "Product added to the cart" });
    } else {
      // Customer already has a cart, add the product to cart_items
      const cart_id = cartResults[0].cart_id;

      await db
        .promise()
        .query(
          "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
          [cart_id, product_id, quantity]
        );

      res.status(201).json({ message: "Product added to the cart" });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { quantity } = req.body;

  try {
    await db
      .promise()
      .query("UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?", [
        quantity,
        cartItemId,
      ]);

    res.status(200).json({ message: "Cart item updated" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeCartItem = async (req, res) => {
  const cartItemId = req.params.cartItemId;

  try {
    await db
      .promise()
      .query("DELETE FROM cart_items WHERE cart_item_id = ?", [cartItemId]);

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const viewCart = async (req, res) => {
  const customerId = req.user.user_id;

  try {
    const [results] = await db
      .promise()
      .query(
        "SELECT ci.cart_item_id, ci.product_id, p.title, p.selling_price, ci.quantity FROM cart_items ci INNER JOIN products p ON ci.product_id = p.product_id WHERE ci.cart_id = (SELECT cart_id FROM cart WHERE customer_id = ?)",
        [customerId]
      );

    res.status(200).json({ cartItems: results });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addToCart, updateCartItem, removeCartItem, viewCart };
