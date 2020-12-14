const User = require('../models/user.model');
const passport = require('passport');

module.exports = {
  findAll: async(req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch(error) {
      res.json(error);
    }
  },
  deleteAll: async(req, res, next) => {
    try {
      const users = await User.deleteMany();
      res.json(users);
    } catch(error) {
      res.json(error);
    }
  },
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
    if (req.session.passport) {
      req.session.destroy((error) => {
        if (error) {
          return res.json(error);
        }
        return res.json({ success: true, message: 'Logout successul' });
      });
    } else {
      return res.json({ error: true, message: 'User not logged in' });
    }
  },
};
