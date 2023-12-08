const { User } = require('../model');
const { errorResponse } = require('../utils/apiResponse');

async function getUser(req, res) {
  res.send(req.user);
}

async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  getUser,
  createUser,
};
