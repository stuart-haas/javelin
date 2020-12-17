const router = require('express').Router();
const controller = require('../controllers/cart.controller');

router.route('/merge').get(controller.merge);

router
  .route('/')
  .get(controller.get)
  .post(controller.add)
  .put(controller.remove)
  .delete(controller.empty);

module.exports = router;
