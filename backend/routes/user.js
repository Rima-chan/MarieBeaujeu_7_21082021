const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const connexionAccountLimiter = require('../middleware/limiter');
const createAccountLimiter = require('../middleware/limiter');
const passValidation = require('../middleware/passValidator');
const userParamsValidator = require('../middleware/userParamsValidator');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:id', auth, userParamsValidator, multer, userCtrl.updateProfilInfos);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;