const express = require('express');
const router = express.Router();
const { Category, Product } = require('../models');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: { isActive: true },
      include: [{ model: Category, as: 'subcategories', where: { isActive: true } }],
      order: [['sortOrder', 'ASC']],
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'subcategories', where: { isActive: true } },
        { model: Product, as: 'products', where: { isActive: true }, limit: 10 },
      ],
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    await category.update(req.body);

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    await category.destroy();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
