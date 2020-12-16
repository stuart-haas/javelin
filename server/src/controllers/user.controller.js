const User = require('../models/user.model');
const passport = require('passport');

module.exports = {
  register: (req, res) => {
    User.register(
      new User({ username: req.body.username, email: req.body.email }),
      req.body.password,
      (error) => {
        if (error) {
          return res.json(error);
        } else {
          passport.authenticate('local')(req, res, () => {
            res.json({ success: true, message: 'Registration successful' });
          });
        }
      }
    );
  },
  login: (req, res) => {
    const user = req.user.toJSON();
    return res.json({
      success: true,
      message: 'Login successful',
      user,
    });
  },
  logout: (req, res) => {
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
