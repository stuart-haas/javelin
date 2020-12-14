const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = {
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      return next();
    }
  },
  isAuthenticatd: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).send({ error: true, message: 'You are not authorized' });
  },
};
