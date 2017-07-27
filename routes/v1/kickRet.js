const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const kickRetController = require('../../controllers/kickReturnController');

routerProtected.get('/', kickRetController.kick_ret_list);
routerProtected.get('/:id', kickRetController.kick_ret_detail);

routerAdmin.post('/', kickRetController.kick_ret_create);
routerAdmin.patch('/:id', kickRetController.kick_ret_patch);
routerAdmin.put('/:id', kickRetController.kick_ret_put);
routerAdmin.delete('/:id', kickRetController.kick_ret_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
