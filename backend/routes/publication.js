const express = require('express');
const router = express.Router();
const publicationCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, publicationCtrl.createNewPublication);
router.put('/:id', auth, multer, publicationCtrl.updatePublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);
router.get('/:id', auth, publicationCtrl.getOnePublication);
router.get('/', auth, publicationCtrl.getAllPublications);

module.exports = router;