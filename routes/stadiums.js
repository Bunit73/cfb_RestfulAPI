const express = require('express');

const router = express.Router();

// controller
const stadiumController = require('../controllers/stadiumController');

/* Single Stadium Methods */
router.get('/:id', stadiumController.stadium_detail);
router.delete('/:id', stadiumController.statdium_delete);
router.patch('/:id', stadiumController.stadium_patch);
router.put('/:id', stadiumController.stadium_put);
router.post('/', stadiumController.statdium_create);

/* Get All Stadiums */
router.get('/', stadiumController.stadium_list);

module.exports = router;
