const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const passingController = require('../../controllers/passingController');

// protected routes
routerProtected.get('/', passingController.passing_list);
routerProtected.get('/:id', passingController.pass_detail);

// admin routes
routerAdmin.patch('/:id', passingController.passing_patch);
routerAdmin.put('/:id', passingController.passing_put);
routerAdmin.delete('/:id', passingController.passing_delete);
routerAdmin.post('/', passingController.create_passing);


module.exports = {
    unprotected: router,
    protected: routerProtected,
    admin: routerAdmin,
};
