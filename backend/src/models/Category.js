const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
  icon: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  parentId: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true,
  tableName: 'categories',
  indexes: [
    { fields: ['slug'] },
    { fields: ['parentId'] },
  ],
});

Category.beforeCreate((category) => {
  if (!category.slug) {
    category.slug = category.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = Category;
