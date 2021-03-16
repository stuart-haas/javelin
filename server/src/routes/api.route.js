const router = require('express').Router();
const upload = require('./upload.route');
const user = require('./user.route');

router.use('/upload', upload);
router.use('/user', user);

module.exports = router;
