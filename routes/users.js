const express = require('express');

const router = express.Router();

// controller
const userController = require('../controllers/userController');

router.post('/', userController.user_create);
router.post('/login', userController.user_login);

// TODO: CREATE CRUD parts for user control

module.exports = router;
