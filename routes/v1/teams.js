const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const teamController = require('../../controllers/teamController');

// Protected Routes
routerProtected.get('/', teamController.team_list);
routerProtected.get('/:id', teamController.team_detail);

// Admin Routes
routerAdmin.post('/', teamController.create_team);
routerAdmin.delete('/', teamController.create_team);
routerAdmin.patch('/', teamController.team_patch);
routerAdmin.put('/', teamController.team_put);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
