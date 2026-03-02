const { body } = require('express-validator');

exports.productValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 200 }).withMessage('Name must be between 3 and 200 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),

  body('images')
    .optional()
    .isArray(),
];
