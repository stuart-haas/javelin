const router = require('express').Router();
const controller = require('../controllers/product.controller');
const auth = require('../utils/auth');

router.get('/', controller.findAll);
router.post('/', auth.isAuthenticated, controller.create);

router
  .route('/:id')
  .get(controller.find)
  .put(auth.isAdmin, controller.update)
  .delete(auth.isAdmin, auth.isAuthenticated, controller.delete);

module.exports = router;
