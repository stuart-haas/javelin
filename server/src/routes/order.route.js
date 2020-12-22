const router = require('express').Router();
const controller = require('../controllers/order.controller');
const auth = require('../utils/auth');

router
  .route('/')
  .get(controller.admin.findAll)
  .post(controller.create)
  .delete(controller.deleteAll);

router.route('/cp').get(auth.isAdmin, controller.admin.findAll);

router
  .route('/cp/:id')
  .get(auth.isAdmin, controller.find)
  .put(auth.isAdmin, controller.update)
  .delete(auth.isAdmin, controller.delete);

router.route('/:user').get(auth.isMe, controller.findAll);

router.route('/:user/:id').get(auth.isMe, controller.findMine);

module.exports = router;
