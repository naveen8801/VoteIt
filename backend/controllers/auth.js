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
    return next(error);
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
    console.log(error);
    return next(error);
  }
});

exports.handleGetUser = async (req, res, next) => {
  console.log(`INFO : User fetched successfully`);
  console.log(`INFO : ${req?.user}`);
  return res.status(200).json({
    data: {
      _id: req?.user?._id,
      name: req?.user?.name,
      email: req?.user?.email,
      createdAt: req?.user?.createdAt,
    },
  });
};

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
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      token: token,
      data: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        createdAt: user?.createdAt,
      },
    });
};
