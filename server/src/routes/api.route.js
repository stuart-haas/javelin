const router = require('express').Router();
const user = require('./user.route');
const product = require('./product.route');
const category = require('./category.route');
const cart = require('./cart.route');

router.use('/user', user);
router.use('/product', product);
router.use('/category', category);
router.use('/cart', cart);

module.exports = router;
