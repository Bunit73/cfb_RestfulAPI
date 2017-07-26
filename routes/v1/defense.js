const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

const defenseController = require('../../controllers/defenseController');

routerProtected.get('/', defenseController.defense_list);
routerProtected.get('/:id', defenseController.defense_detail);

routerAdmin.post('/', defenseController.defense_create);
routerAdmin.put('/:id', defenseController.defense_put);
routerAdmin.patch('/:id', defenseController.defense_patch);
routerAdmin.delete('/:id', defenseController.defense_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
