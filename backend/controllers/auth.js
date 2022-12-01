const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

const maxage = 1 * 24 * 60 * 60;

exports.handleLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }
    sendTokenResponse(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse('Network Error', 500));
  }
});

exports.handleRegister = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
    });
    user.save({ validateBeforeSave: false });
    sendTokenResponse(user, 200, res);
  } catch (error) {
    return next(new ErrorResponse(error));
  }
});

// Get token from model and create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken(maxage);
  const options = {
    expiresIn: maxage,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'productions') {
    options.secure = true;
  }
  res.status(statusCode).cookie('token', token, options).json({
    token: token,
  });
};
