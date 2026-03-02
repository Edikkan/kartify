const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Category = require('./Category');

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

Category.hasMany(Category, { foreignKey: 'parentId', as: 'subcategories' });
Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });

Category.hasMany(Product, { foreignKey: 'category', sourceKey: 'name', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'category', targetKey: 'name', as: 'category' });

module.exports = {
  sequelize: require('../config/database').sequelize,
  User,
  Product,
  Order,
  Category,
};
