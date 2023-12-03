const express = require('express');
const { getUser, getAllUsers } = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;
