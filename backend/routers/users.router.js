const express = require("express");
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getAllUsers);

router.get('/:userName', usersController.getUserById);

router.post('/', usersController.sighnUp);

// router.put('/:id');

// router.delete('/:id');

module.exports = router;