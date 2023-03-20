const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a First name'],
  },
  config: {
    users: [
      {
        email: {
          type: String,
        },
        filledAt: {
          type: Date,
        },
        filled: {
          type: Boolean,
          default: false,
        },
      },
    ],
    encodedData: {
      type: String,
      required: [true, 'Please input valid data for this resource'],
    },
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Number,
    required: [true, 'Please input valid expiry date for this resource'],
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  author: {
    email: {
      type: String,
      required: [true, 'Author email is required'],
    },
    name: {
      type: String,
      required: [true, 'Author name is required'],
    },
  },
});

module.exports = mongoose.model('Resources', ResourceSchema);
