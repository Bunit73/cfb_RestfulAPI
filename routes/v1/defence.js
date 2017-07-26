const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const defenceController = require('../../controllers/defenceController');

routerProtected.get('/', defenceController.defence_list);
routerProtected.get('/:id', defenceController.defence_detail);

routerAdmin.post('/', defenceController.defence_create);
routerAdmin.put('/:id', defenceController.defence_put);
routerAdmin.patch('/:id', defenceController.defence_patch);
routerAdmin.delete('/:id', defenceController.defence_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
