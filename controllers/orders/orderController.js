const db = require("../../config/dbConnection"); // Your database connection

// Create a new order
const createOrder = async (req, res) => {
  try {
    const customerId = req.user.user_id;
    const { status, items } = req.body;

    // Start a database transaction
    await db.promise().beginTransaction();

    // Insert the order into the orders table
    const orderInsertResult = await db
      .promise()
      .query("INSERT INTO orders (customer_id, status) VALUES (?, ?)", [
        customerId,
        status,
      ]);

    const orderId = orderInsertResult[0].insertId;

    // Handle adding order items to the order_items table (if applicable)
    if (items && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        const { product_id, quantity, subtotal } = item;

        // Insert the order item into the order_items table
        await db
          .promise()
          .query(
            "INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)",
            [orderId, product_id, quantity, subtotal]
          );
      }
    }

    // Commit the database transaction
    await db.promise().commit();

    res
      .status(201)
      .json({ message: "Order created successfully", order_id: orderId });
  } catch (error) {
    console.error(error);

    // Rollback the transaction if an error occurred
    await db.promise().rollback();

    res.status(500).json({ message: "Error creating order" });
  }
};

// Get details of a specific order by order_id

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Query the database to retrieve the order details

    const [order] = await db.promise().query(
      "SELECT o.order_id, o.customer_id, o.status, oi.order_item_id, oi.product_id, oi.quantity, oi.subtotal FROM orders o INNER JOIN order_items oi ON o.order_id = oi.order_id WHERE o.order_id = ?",

      [orderId]
    );

    if (order.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error fetching order" });
  }
};

// Update the status of an order

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const { status } = req.body;

    // Update the status of the order in the orders table

    await db
      .promise()
      .query("UPDATE orders SET status = ? WHERE order_id = ?", [
        status,
        orderId,
      ]);

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error updating order status" });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  updateOrderStatus,
};
