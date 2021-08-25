const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const connexionAccountLimiter = require('../middleware/limiter');
const createAccountLimiter = require('../middleware/limiter');
const passValidation = require('../middleware/passValidator');

router.post('/signup', passValidation, createAccountLimiter, userCtrl.signup);
router.post('/login', connexionAccountLimiter, userCtrl.login);

module.exports = router;