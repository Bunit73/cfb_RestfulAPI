const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const confController = require('../../controllers/conferenceController');

// protected routes
routerProtected.get('/', confController.conf_list);
routerProtected.get('/:id', confController.conf_detail);

// admin routes
routerAdmin.post('/', confController.conf_create);
routerAdmin.put('/:id', confController.conf_put);
routerAdmin.patch('/:id', confController.conf_patch);
routerAdmin.delete('/:id', confController.conf_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
