const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const seasonController = require('../../controllers/seasonController');

// protected routes
routerProtected.get('/', seasonController.season_list);
routerProtected.get('/:id', seasonController.season_detail);

// admin routes
routerAdmin.patch('/:id', seasonController.season_patch);
routerAdmin.put('/:id', seasonController.season_put);
routerAdmin.delete('/:id', seasonController.season_delete);
routerAdmin.post('/', seasonController.season_create);


module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
