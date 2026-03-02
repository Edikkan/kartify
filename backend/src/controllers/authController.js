const jwt = require('jsonwebtoken');
const { User } = require('../models');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('token', token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    token,
    user: user.getPublicProfile(),
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return next(new AppError('Email already registered', 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
  });

  logger.info(`New user registered: ${email}`);

  sendTokenResponse(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  if (!user.isActive) {
    return next(new AppError('Account is deactivated', 403));
  }

  user.lastLogin = new Date();
  await user.save();

  logger.info(`User logged in: ${email}`);

  sendTokenResponse(user, 200, res);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    user: user.getPublicProfile(),
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const fieldsToUpdate = ['firstName', 'lastName', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];

  fieldsToUpdate.forEach(field => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  await user.save();

  res.status(200).json({
    success: true,
    user: user.getPublicProfile(),
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findByPk(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return next(new AppError('Current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  logger.info(`Password changed for user: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(new AppError('No user found with that email', 404));
  }

  const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({
    success: true,
    message: 'Password reset link sent to email',
    resetToken,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    user.password = password;
    await user.save();

    logger.info(`Password reset for user: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    return next(new AppError('Invalid or expired reset token', 400));
  }
});

exports.logout = catchAsync(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
