const { body } = require('express-validator');

exports.orderValidator = [
  body('items')
    .notEmpty().withMessage('Items are required')
    .isArray({ min: 1 }).withMessage('At least one item is required'),

  body('items.*.productId')
    .notEmpty().withMessage('Product ID is required')
    .isUUID().withMessage('Invalid product ID'),

  body('items.*.quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),

  body('items.*.price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

  body('shippingAddress')
    .notEmpty().withMessage('Shipping address is required')
    .isObject(),

  body('paymentMethod')
    .notEmpty().withMessage('Payment method is required'),
];
