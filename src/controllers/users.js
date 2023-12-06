const { User } = require('../model');
const { errorResponse } = require('../utils/apiResponse');
const { emailRequired, passwordRequired } = require('../constants/errors');

async function getUser(req, res) {
  try {
    res.send(req.user);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function createUser(req, res) {
  try {
    // TO-DO validate data
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function authenticateUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send(emailRequired);
    }

    if (!password) {
      res.status(400).send(passwordRequired);
    }

    const user = await User.findByCredentials(email, password);
    const authToken = await user.generateAuthToken();
    res.status(200).send({ authToken });
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  getUser,
  createUser,
  authenticateUser,
};
