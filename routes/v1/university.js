const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const universityController = require('../../controllers/universityController');

/* Single University Methods */
routerProtected.get('/:id', universityController.university_detail);

routerAdmin.patch('/:id', universityController.university_patch);
routerAdmin.put('/:id', universityController.university_put);
routerAdmin.post('/', universityController.university_create_post);
routerAdmin.delete('/:id', universityController.university_delete);

/* Get All Universities */
routerProtected.get('/', universityController.university_list);

module.exports = {
    unprotected: router,
    protected: routerProtected,
    admin: routerAdmin
};
