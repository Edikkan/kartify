const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200],
    },
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.STRING(500),
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
  costPrice: {
    type: DataTypes.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  variants: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  specifications: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5,
    },
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  soldCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDeal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sellerId: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
  tableName: 'products',
  indexes: [
    { fields: ['slug'] },
    { fields: ['category'] },
    { fields: ['featured'] },
    { fields: ['isActive'] },
    { fields: ['sellerId'] },
  ],
});

Product.beforeCreate((product) => {
  if (!product.slug) {
    product.slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = Product;
