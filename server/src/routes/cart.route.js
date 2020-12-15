const router = require('express').Router();
const controller = require('../controllers/cart.controller');

router.get('/', controller.get);
router.post('/', controller.add);
router.put('/', controller.remove);
router.delete('/', controller.empty);

module.exports = router;
