const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

dotenv.config();

const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.header('Authorization').replace('Bearer ', '');
    const { _id } = jwt.verify(authToken, JWT_SECRET);
    const user = await User.findOne({
      _id,
      'authTokens.authToken': authToken,
    });

    if (!user) throw new Error('');

    req.user = user;
    req.authToken = authToken;
    next();
  } catch (e) {
    res.status(401).send({ errorMsg: 'Unauthorized' });
  }
};

module.exports = {
  authMiddleware,
};
