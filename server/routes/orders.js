const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Public: create order
router.post('/', orderController.createOrder);

// Admin: list orders
router.get('/', orderController.getOrders);

// Admin: order detail
router.get('/:id', orderController.getOrder);

// Admin: update status
router.put('/:id/status', orderController.updateStatus);

module.exports = router;
