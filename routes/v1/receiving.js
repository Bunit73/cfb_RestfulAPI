const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const receivingController = require('../../controllers/receivingController');

routerProtected.get('/', receivingController.recv_list);
routerProtected.get('/:id', receivingController.recv_detail);

routerAdmin.post('/', receivingController.recv_create);
routerAdmin.patch('/:id', receivingController.recv_patch);
routerAdmin.put('/:id', receivingController.recv_put);
routerAdmin.delete('/:id', receivingController.recv_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
