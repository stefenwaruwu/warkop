const pool = require('../config/db');

const generateOrderCode = () => {
  // Simple unique code: BER + timestamp + 4 random digits
  const ts = Date.now().toString().slice(-6);
  const rnd = Math.floor(1000 + Math.random() * 9000);
  return `BER${ts}${rnd}`;
};

exports.createOrder = async ({ items, customer_note, total_amount }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const order_code = generateOrderCode();
    const [orderRes] = await conn.query(
      'INSERT INTO orders (order_code, customer_note, total_amount) VALUES (?, ?, ?)',
      [order_code, customer_note || null, total_amount]
    );
    const orderId = orderRes.insertId;

    const itemPromises = items.map((it) => {
      return conn.query(
        'INSERT INTO order_items (order_id, menu_id, name, price, quantity, note) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, it.id || null, it.name, it.price, it.quantity, it.note || null]
      );
    });
    await Promise.all(itemPromises);
    await conn.commit();
    return { id: orderId, order_code };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

exports.getOrders = async () => {
  const [orders] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return orders;
};

exports.getOrderById = async (id) => {
  const [[order]] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  if (!order) return null;
  const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [id]);
  order.items = items;
  return order;
};

exports.updateStatus = async (id, status) => {
  const [res] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
  return res.affectedRows > 0;
};
