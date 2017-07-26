const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const rushingController = require('../../controllers/rushingController');

routerProtected.get('/', rushingController.rushing_list);
routerProtected.get('/:id', rushingController.rushing_detail);

routerAdmin.post('/', rushingController.create_rushing);
routerAdmin.patch('/:id', rushingController.rushing_patch);
routerAdmin.put('/:id', rushingController.rushing_put);
routerAdmin.delete('/:id', rushingController.rushing_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
