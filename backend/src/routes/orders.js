const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { orderValidator } = require('../validators/orderValidator');

router.route('/')
  .get(protect, authorize('admin'), getAllOrders)
  .post(protect, orderValidator, createOrder);

router.get('/my', protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrder);

router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);
router.put('/:id/cancel', protect, cancelOrder);

module.exports = router;
