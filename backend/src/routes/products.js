const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getDealProducts,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { productValidator } = require('../validators/productValidator');

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin', 'vendor'), productValidator, createProduct);

router.get('/featured', getFeaturedProducts);
router.get('/deals', getDealProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin', 'vendor'), productValidator, updateProduct)
  .delete(protect, authorize('admin', 'vendor'), deleteProduct);

module.exports = router;
