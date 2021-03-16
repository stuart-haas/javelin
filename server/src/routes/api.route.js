const router = require('express').Router();
const upload = require('./upload.route');
const user = require('./user.route');
const tracker = require('./tracker.route');
const project = require('./project.route');

router.use('/upload', upload);
router.use('/user', user);
router.use('/tracker', tracker);
router.use('/project', project);

module.exports = router;
