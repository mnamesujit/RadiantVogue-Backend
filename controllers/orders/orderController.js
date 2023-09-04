
const db = require('../../config/dbConnection'); // Your database connection

// Create a new order
const createOrder = async (req, res) => {
  try {
    const customerId = req.user.user_id;
    const { status, items } = req.body;

    // Start a database transaction
    await db.promise().beginTransaction();

    // Insert the order into the orders table
    const orderInsertResult = await db.promise().query(
      'INSERT INTO orders (customer_id, status) VALUES (?, ?)',
      [customerId, status]
    );
    
    const orderId = orderInsertResult[0].insertId;

    // Handle adding order items to the order_items table (if applicable)
    if (items && Array.isArray(items) && items.length > 0) {
      for (const item of items) {
        const { product_id, quantity, subtotal } = item;

        // Insert the order item into the order_items table
        await db.promise().query(
          'INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)',
          [orderId, product_id, quantity, subtotal]
        );
      }
    }

    // Commit the database transaction
    await db.promise().commit();

    res.status(201).json({ message: 'Order created successfully', order_id: orderId });
  } catch (error) {
    console.error(error);

    // Rollback the transaction if an error occurred
    await db.promise().rollback();

    res.status(500).json({ message: 'Error creating order' });
  }
};


module.exports = {
  createOrder,
};
