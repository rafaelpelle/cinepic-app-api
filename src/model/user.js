const mongoose = require('mongoose');
const validator = require('validator');
const bcript = require('bcryptjs');
const { invalidCredentials, emailInvalid } = require('../constants/errors');

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
});

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
