const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Subschema for resources
var resourcesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resource title required"],
    },
    resourceId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Resource Id required"],
    },
    createdAt: {
      type: Number,
      required: [true, "Resource createdAt required"],
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a First name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  resources: [resourcesSchema],
});

// Encrypt Password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function (maxage) {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: maxage,
  });
};

// Match user entered password with hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("user", UserSchema);
