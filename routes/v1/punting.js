const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const puntingController = require('../../controllers/puntingController');

routerProtected.get('/', puntingController.punting_list);
routerProtected.get('/:id', puntingController.punting_detail);

routerAdmin.post('/', puntingController.create_punt);
routerAdmin.patch('/:id', puntingController.punt_patch);
routerAdmin.put('/:id', puntingController.punt_put);
routerAdmin.delete('/:id', puntingController.punting_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
