const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/user.middleware');
const auth = require('../utils/auth');

router.get('/', auth.isAuthenticatd, controller.findAll);
router.post('/register', middleware.registrationRules, auth.validate, controller.register);
router.post('/login', middleware.loginRules, auth.validate, passport.authenticate('local'), controller.login);
router.post('/logout', controller.logout);

module.exports = router;
