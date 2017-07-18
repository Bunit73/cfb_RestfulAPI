const express = require('express');

const router = express.Router();

// controller
const universityController = require('../controllers/universityController');

/* Single University Methods */
router.get('/:id', universityController.university_detail);
router.delete('/:id', universityController.university_delete);
router.patch('/:id', universityController.university_patch);
router.put('/:id', universityController.university_put);
router.post('/', universityController.university_create_post);

/* Get All Universities */
router.get('/', universityController.university_list);

module.exports = router;
