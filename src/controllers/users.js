const { User } = require('../model');
const { errorResponse } = require('../utils/apiResponse');

async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.send(user);
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();

    res.send(allUsers);
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  getUser,
  getAllUsers,
};
