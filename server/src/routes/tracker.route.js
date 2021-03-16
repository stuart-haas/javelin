const router = require('express').Router();
const controller = require('../controllers/tracker.controller');
const auth = require('../utils/auth');

router.route('/').all(auth.isAuthenticated).get(controller.findAll).post(controller.create);

router
  .route('/:id')
  .all(auth.isAuthenticated)
  .get(controller.find)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;