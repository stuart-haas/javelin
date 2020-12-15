const User = require('../models/user.model');
const passport = require('passport');

module.exports = {
  register: (req, res, next) => {
    User.register(new User({username: req.body.username}),
    req.body.password, (error, user) => {
      if (error) {
        return res.json(error);
      } else {
        passport.authenticate('local')(req, res, () => {
          res.json({ success: true, message: 'Registration successful' });
        });
      }
    });
  },
  login: (req, res, next) => {
    return res.json({ success: true, message: 'Login successful' });
  },
  logout: (req, res, next) => {
    if (req.user) {
      req.logout();
      req.session.destroy((error) => {
        if (error) {
          return res.json(error);
        }
        return res.json({ success: true, message: 'Logout successul' });
      });
    } else {
      return res.json({ error: true, message: 'You are not logged in' });
    }
  },
};
