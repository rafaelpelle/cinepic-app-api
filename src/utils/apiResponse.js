const { getErrorMessage } = require('./errorHandling');

function errorResponse(res, error) {
  return res.status(500).json({ errorMsg: getErrorMessage(error) });
}

module.exports = {
  errorResponse,
};
