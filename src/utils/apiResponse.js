const { getErrorMessage } = require('./errorHandling');
const errors = require('../constants/errors');

function errorResponse(res, error) {
  const errorMsg = getErrorMessage(error);
  const isBadRequest = Object.values(errors).includes(errorMsg);

  return res.status(isBadRequest ? 400 : 500).json({ errorMsg });
}

module.exports = {
  errorResponse,
};
