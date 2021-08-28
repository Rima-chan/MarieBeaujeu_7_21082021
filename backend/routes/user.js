const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const passValidation = require('../middleware/passValidator');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);
router.put('/:id', auth, multer, userCtrl.updateProfilInfos);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;