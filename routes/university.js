const express = require('express');

const router = express.Router();

// controller
const universityController = require('../controllers/universityController');

/* POST Request for creating University */
router.post('/', universityController.university_create_post);

/* Get All Universities */
router.get('/', universityController.university_list);

module.exports = router;
