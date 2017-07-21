const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const stadiumController = require('../../controllers/stadiumController');

/* Single Stadium Methods */
routerProtected.get('/:id', stadiumController.stadium_detail);

routerAdmin.delete('/:id', stadiumController.stadium_delete);
routerAdmin.patch('/:id', stadiumController.stadium_patch);
routerAdmin.put('/:id', stadiumController.stadium_put);
routerAdmin.post('/', stadiumController.stadium_create);

/* Get All Stadiums */
routerProtected.get('/', stadiumController.stadium_list);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
