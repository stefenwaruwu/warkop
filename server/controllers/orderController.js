const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const { items, customer_note } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ status: 'error', message: 'Cart items required' });
    }
    const total_amount = items.reduce((sum, it) => sum + Number(it.price) * Number(it.quantity), 0);
    const result = await Order.createOrder({ items, customer_note, total_amount });
    return res.status(201).json({ status: 'success', data: { order_id: result.id, order_code: result.order_code } });
  } catch (err) {
    console.error('createOrder error', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.getOrders();
    return res.json({ status: 'success', data: orders });
  } catch (err) {
    console.error('getOrders error', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.getOrderById(id);
    if (!order) return res.status(404).json({ status: 'error', message: 'Order not found' });
    return res.json({ status: 'success', data: order });
  } catch (err) {
    console.error('getOrder error', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ok = await Order.updateStatus(id, status);
    if (!ok) return res.status(404).json({ status: 'error', message: 'Order not found' });
    return res.json({ status: 'success', message: 'Status updated' });
  } catch (err) {
    console.error('updateStatus error', err);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
