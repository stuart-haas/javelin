const { validationResult } = require('express-validator');
const User = require('../models/user.model');

module.exports = {
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      return next();
    }
  },
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).send({ error: true, message: 'You are not authorized' });
  },
  isMe: (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
    const isMe = req.user._id && String(req.user._id) === String(req.params.id);

    if (isAuthenticated && isMe) {
      return next();
    }

    res.status(401).send({ error: true, message: 'You are not authorized' });
  },
  isAdmin: async (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      if (!req.user.isAdmin || !isAuthenticated) {
        return res
          .status(401)
          .json({ error: true, message: 'You are not authorized ' });
      }
    } else {
      if (!user.isAdmin) {
        return res
          .status(401)
          .json({ error: true, message: 'You are not authorized ' });
      }
    }
    next();
  },
};
