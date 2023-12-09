const { User } = require('../model');
const { errorResponse } = require('../utils/apiResponse');
const { REQUIRED_EMAIL, REQUIRED_PASSWORD } = require('../constants/errors');

async function authenticateUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send(REQUIRED_EMAIL);
    }

    if (!password) {
      res.status(400).send(REQUIRED_PASSWORD);
    }

    const user = await User.findByCredentials(email, password);
    const authToken = await user.generateAuthToken();
    res.status(200).send({ authToken });
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function logoutUser(req, res) {
  try {
    const { user, authToken } = req;
    user.authTokens = user.authTokens.filter(
      (item) => item.authToken !== authToken,
    );

    await user.save();
    res.status(204).send();
  } catch (error) {
    return errorResponse(res, error);
  }
}

async function logoutUserAllTokens(req, res) {
  try {
    const { user } = req;
    user.authTokens = [];
    await user.save();
    res.status(204).send();
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  authenticateUser,
  logoutUser,
  logoutUserAllTokens,
};
