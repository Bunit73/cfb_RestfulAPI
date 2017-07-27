const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const kickingController = require('../../controllers/kickingController');

routerProtected.get('/', kickingController.kicking_list);
routerProtected.get('/:id', kickingController.kicking_detail);

routerAdmin.post('/', kickingController.kicking_create);
routerAdmin.patch('/:id', kickingController.kicking_patch);
routerAdmin.put('/:id', kickingController.kicking_put);
routerAdmin.delete('/:id', kickingController.kicking_delete);

module.exports = {
    unprotected: router,
    protected: routerProtected,
    admin: routerAdmin,
};
