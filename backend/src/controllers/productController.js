const { Product, Category } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

exports.getProducts = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = 12,
    category,
    minPrice,
    maxPrice,
    search,
    sort = 'createdAt',
    order = 'DESC',
    featured,
    deal,
  } = req.query;

  const offset = (page - 1) * limit;
  const where = { isActive: true };

  if (category) {
    where.category = category;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = minPrice;
    if (maxPrice) where.price[Op.lte] = maxPrice;
  }

  if (featured === 'true') {
    where.featured = true;
  }

  if (deal === 'true') {
    where.isDeal = true;
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    const { Op } = require('sequelize');
    where[Op.or] = [
      { name: { [Op.iLike]: `%${searchTerm}%` } },
      { description: { [Op.iLike]: `%${searchTerm}%` } },
    ];
  }

  const { count, rows: products } = await Product.findAndCountAll({
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sort, order]],
    include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
  });

  const categories = await Category.findAll({
    where: { isActive: true },
    attributes: ['id', 'name', 'slug'],
  });

  res.status(200).json({
    success: true,
    count: products.length,
    total: count,
    page: parseInt(page),
    pages: Math.ceil(count / limit),
    products,
    categories,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id, {
    include: [{ model: Category, as: 'category' }],
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    ...req.body,
    sellerId: req.user.id,
  });

  logger.info(`Product created: ${product.name}`);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  let product = await Product.findByPk(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (req.user.role !== 'admin' && product.sellerId !== req.user.id) {
    return next(new AppError('Not authorized to update this product', 403));
  }

  product = await product.update(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (req.user.role !== 'admin' && product.sellerId !== req.user.id) {
    return next(new AppError('Not authorized to delete this product', 403));
  }

  await product.destroy();

  logger.info(`Product deleted: ${product.name}`);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

exports.getFeaturedProducts = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 8;

  const products = await Product.findAll({
    where: { featured: true, isActive: true },
    limit,
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

exports.getDealProducts = catchAsync(async (req, res, next) => {
  const { Op } = require('sequelize');

  const products = await Product.findAll({
    where: {
      isDeal: true,
      isActive: true,
      originalPrice: { [Op.gt]: sequelize.col('price') },
    },
    order: [['createdAt', 'DESC']],
  });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});
