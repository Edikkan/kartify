const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'),
    defaultValue: 'pending',
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shipping: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  paymentId: {
    type: DataTypes.STRING,
  },
  shippingAddress: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  billingAddress: {
    type: DataTypes.JSONB,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  trackingNumber: {
    type: DataTypes.STRING,
  },
  shippedAt: {
    type: DataTypes.DATE,
  },
  deliveredAt: {
    type: DataTypes.DATE,
  },
  cancelledAt: {
    type: DataTypes.DATE,
  },
  cancellationReason: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  tableName: 'orders',
  indexes: [
    { fields: ['orderNumber'] },
    { fields: ['userId'] },
    { fields: ['status'] },
    { fields: ['paymentStatus'] },
  ],
});

Order.beforeCreate((order) => {
  if (!order.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    order.orderNumber = `KT-${year}${month}-${random}`;
  }
});

module.exports = Order;
