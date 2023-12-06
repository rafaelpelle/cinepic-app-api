const mongoose = require('mongoose');
const validator = require('validator');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { invalidCredentials, emailInvalid } = require('../constants/errors');

dotenv.config();

const { JWT_SECRET } = process.env;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
    },
    validate: (email) => {
      if (!validator.isEmail(email)) {
        throw new Error(emailInvalid);
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  authTokens: [
    {
      authToken: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.authTokens;
  delete user.__v;
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const authToken = jwt.sign({ _id: this._id.toString() }, JWT_SECRET);
  this.authTokens = [...this.authTokens, { authToken }];
  await this.save();

  return authToken;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(invalidCredentials);
  }

  const passwordMatch = await bcript.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error(invalidCredentials);
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcript.hash(user.password, 5);
  }

  next();
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
};
