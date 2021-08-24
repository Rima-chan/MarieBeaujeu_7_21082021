const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.get('/signup', userCtrl.test);

module.exports = router;