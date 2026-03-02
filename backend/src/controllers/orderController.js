const { Order, User, Product } = require('../models');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

exports.createOrder = catchAsync(async (req, res, next) => {
  const { items, shippingAddress, billingAddress, paymentMethod, notes } = req.body;

  if (!items || items.length === 0) {
    return next(new AppError('No items in order', 400));
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 2000;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product || product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for ${item.name}`, 400));
    }
  }

  const order = await Order.create({
    userId: req.user.id,
    items,
    subtotal,
    shipping,
    tax,
    total,
    paymentMethod,
    shippingAddress,
    billingAddress: billingAddress || shippingAddress,
    notes,
  });

  for (const item of items) {
    await Product.decrement('stock', {
      by: item.quantity,
      where: { id: item.productId },
    });
    await Product.increment('soldCount', {
      by: item.quantity,
      where: { id: item.productId },
    });
  }

  logger.info(`Order created: ${order.orderNumber} by user ${req.user.id}`);

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (page - 1) * limit;

  const where = { userId: req.user.id };
  if (status) {
    where.status = status;
  }

  const { count, rows: orders } = await Order.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    total: count,
    page: parseInt(page),
    orders,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to view this order', 403));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  order.status = status;

  if (status === 'shipped') {
    order.shippedAt = new Date();
  }

  if (status === 'delivered') {
    order.deliveredAt = new Date();
  }

  await order.save();

  logger.info(`Order ${order.orderNumber} status updated to ${status}`);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.cancelOrder = catchAsync(async (req, res, next) => {
  const { reason } = req.body;

  const order = await Order.findByPk(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to cancel this order', 403));
  }

  if (!['pending', 'confirmed'].includes(order.status)) {
    return next(new AppError('Cannot cancel order in current status', 400));
  }

  order.status = 'cancelled';
  order.cancelledAt = new Date();
  order.cancellationReason = reason;

  for (const item of order.items) {
    await Product.increment('stock', {
      by: item.quantity,
      where: { id: item.productId },
    });
    await Product.decrement('soldCount', {
      by: item.quantity,
      where: { id: item.productId },
    });
  }

  await order.save();

  logger.info(`Order ${order.orderNumber} cancelled by user ${req.user.id}`);

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 20, status, startDate, endDate } = req.query;
  const offset = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;
  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) where.createdAt[Op.gte] = startDate;
    if (endDate) where.createdAt[Op.lte] = endDate;
  }

  const { count, rows: orders } = await Order.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']],
    include: [{ model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] }],
  });

  res.status(200).json({
    success: true,
    count: orders.length,
    total: count,
    page: parseInt(page),
    orders,
  });
});
