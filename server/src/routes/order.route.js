const router = require('express').Router();
const controller = require('../controllers/order.controller');
const auth = require('../utils/auth');

router
  .route('/')
  .get(controller.findAll)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.deleteAll);

router.route('/:id').get(controller.find).delete(controller.delete);

module.exports = router;
