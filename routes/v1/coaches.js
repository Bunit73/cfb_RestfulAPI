const express = require('express');

const router = express.Router();
const routerProtected = express.Router();
const routerAdmin = express.Router();

// controller
const coachController = require('../../controllers/coachController');

// protected routes
routerProtected.get('/:id', coachController.coach_detail);
routerProtected.get('/:id', coachController.coach_list);

// admin routes
routerAdmin.patch('/:id', coachController.coach_patch);
routerAdmin.put('/:id', coachController.coach_put);
routerAdmin.post('/', coachController.coach_create);
routerAdmin.delete('/:id', coachController.coach_delete);

module.exports = {
  unprotected: router,
  protected: routerProtected,
  admin: routerAdmin,
};
