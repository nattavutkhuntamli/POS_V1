const express = require('express');

const router = express.Router();

router.use('/package', require('./Package'))
router.use('/member', require('./Member'))
router.use('/product', require('./product'))
router.use('/user',require('./User'))
module.exports = router
