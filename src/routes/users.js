const express = require('express');
const { getUser, getAllUsers, createUser } = require('../controllers/users');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/', createUser);

module.exports = router;
