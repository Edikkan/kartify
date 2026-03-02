const jwt = require('jsonwebtoken');
const { User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (!user.isActive) {
      return next(new AppError('User account is deactivated', 403));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized to access this route', 401));
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`User role '${req.user.role}' is not authorized to access this route`, 403)
      );
    }
    next();
  };
};
