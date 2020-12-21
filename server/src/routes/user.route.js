const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/user.middleware');
const auth = require('../utils/auth');

router.route('/').get(auth.isAdmin, controller.findAll);

router.post(
  '/cp/login',
  middleware.loginRules,
  auth.validate,
  auth.isAdmin,
  passport.authenticate('local'),
  controller.login
);

router
  .route('/cp/:id')
  .get(auth.isAdmin, controller.find)
  .put(auth.isAdmin, controller.update)
  .delete(auth.isAdmin, controller.delete);

router.post(
  '/register',
  middleware.registrationRules,
  auth.validate,
  controller.register
);
router.post(
  '/login',
  middleware.loginRules,
  auth.validate,
  passport.authenticate('local'),
  controller.login
);
router.post('/logout', controller.logout);

router.get('/session', controller.session);

router.post('/favorite/:id', auth.isMe, controller.addFavorite);
router.put('/favorite/:id', auth.isMe, controller.removeFavorite);

router
  .route('/:id')
  .get(auth.isMe, controller.find)
  .put(auth.isMe, controller.update)
  .delete(auth.isMe, controller.delete);

module.exports = router;
