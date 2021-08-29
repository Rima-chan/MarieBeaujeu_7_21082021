const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const connexionAccountLimiter = require('../middleware/limiter');
const createAccountLimiter = require('../middleware/limiter');
const passValidation = require('../middleware/passValidator');

router.post('/signup', passValidation, createAccountLimiter, userCtrl.signup);
router.post('/login', connexionAccountLimiter, userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);
router.put('/:id', auth, multer, userCtrl.updateProfilInfos);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;