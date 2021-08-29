const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/:publicationId/comments', auth, commentCtrl.createNewComment);
router.put('/:publicationId/comments/:commentId', auth, commentCtrl.updateComment);
router.get('/:publicationId/comments/:commentId', auth, commentCtrl.getOneComment);
router.get('/:publicationId/comments', auth, commentCtrl.getAllCommentsPublication);

module.exports = router;