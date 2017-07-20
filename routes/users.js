const express = require('express');

const router = express.Router();

// controller
const userController = require('../controllers/userController');

router.post('/', userController.user_create);
router.post('/login', userController.user_login);

module.exports = router;
