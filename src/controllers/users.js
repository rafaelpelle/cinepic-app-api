const { errorResponse } = require('../utils/apiResponse');

async function getUser(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Param 'id' is required");
    }

    res.send({ name: 'Test User', id });
  } catch (error) {
    return errorResponse(res, error);
  }
}

module.exports = {
  getUser,
};
