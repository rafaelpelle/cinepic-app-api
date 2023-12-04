const mongoose = require('mongoose');
const validator = require('validator');
const bcript = require('bcryptjs');

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
        throw new Error('The user email is invalid');
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
