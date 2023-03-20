const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { getExpirationDate } = require('../utils/helpers');
const Resource = require('../models/Resource');
const User = require('../models/User');

exports.handleGetResource = asyncHandler(async (req, res, next) => {
  let resourceId = req.params['resourceId'];
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      res.status(404).json({
        msg: 'No resource found with this id',
      });
    }
    res.status(200).json({
      data: resource,
    });
  } catch (err) {
    return next(err);
  }
});

exports.handleCreateResource = asyncHandler(async (req, res, next) => {
  let resourceData = req?.body;
  const userData = {
    _id: req?.user?._id,
    name: req?.user?.name,
    email: req?.user?.email,
    createdAt: req?.user?.createdAt,
  };

  try {
    const validationResult = validateResourceData(resourceData);
    if (validationResult?.passed) {
      if (!resourceData?.expiresAt) {
        // By Default is there is no expiration date the resource will expire after 5 days
        resourceData.expiresAt = getExpirationDate(5);
      }

      // Adding author obj to resource obj
      resourceData.author = { email: userData?.email, name: userData?.name };

      const resource = await Resource.create(resourceData);
      resource
        .save({ validateBeforeSave: false })
        .then(async (data) => {
          console.log('INFO : Resource Created Successfully');
          console.log(`INFO : ${data}`);
          let currUser = await User.findById(userData?._id);
          let userResources = currUser?.resources || [];
          userResources.push({
            title: resourceData?.title,
            resourceId: data?._id,
            createdAt: data?.createdAt,
          });
          console.log(`INFO : Updatinf user obj after resource creation`);
          User.findByIdAndUpdate(
            currUser?._id,
            { resources: userResources },
            function (err, docs) {
              if (err) {
                console.log(`ERROR : ${err}`);
                res.status(403).json({
                  msg: 'User not updated after resource creation',
                });
              } else {
                console.log(`INFO : User updated successfully`);
                console.log(`INFO : ${docs}`);
                res.status(200).json({
                  msg: 'Resource created successfully',
                });
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json({
            msg: 'Resource creation failed',
          });
        });
    } else {
      res.status(403).json({
        msg: 'Resource data validation failed',
        data: validationResult?.errors,
      });
    }
  } catch (err) {
    return next(err);
  }
});

exports.handleUpdateResource = asyncHandler(async (req, res, next) => {});

exports.handleDeleteResource = asyncHandler(async (req, res, next) => {});

// Validation function
const validateResourceData = (resourceData) => {
  let result = {
    passed: true,
    errors: [],
  };

  if (
    !resourceData?.title ||
    resourceData?.title?.trim().length === 0 ||
    resourceData?.title?.trim().length > 200
  ) {
    result.errors.push(
      'Title must be a valid string having maximum of 200 characters'
    );
  }

  if (
    !resourceData?.config ||
    !resourceData.config.encodedData ||
    typeof resourceData.config.encodedData !== 'string'
  ) {
    result.errors.push(
      'Resource data is required and should have a valid string'
    );
  }

  if (result.errors.length > 0) {
    result.passed = false;
  }

  return result;
};
