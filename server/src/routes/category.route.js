const router = require('express').Router();
const controller = require('../controllers/category.controller');
const auth = require('../utils/auth');

router.get('/', controller.findAll);
router.post('/', auth.isAuthenticated, controller.create);

router.route('/:id')
  .get(controller.find)
  .put(auth.isAuthenticated, controller.update)
  .delete(auth.isAuthenticated, controller.delete);

module.exports = router;
