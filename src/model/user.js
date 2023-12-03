const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (email) => {
      if (!validator.isEmail(email)) {
        throw new Error('The user email is invalid');
      }
    },
  },
  age: {
    type: Number,
  },
});

module.exports = {
  User,
};
