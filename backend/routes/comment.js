const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/:publicationId/comments', auth, commentCtrl.createNewComment);
router.get('/:publicationId/comments/:commentId', auth, commentCtrl.getOneComment)
router.put('/:publicationId/comments/:commentId', auth, commentCtrl.updateComment);
router.delete('/:publicationId/comments/:commentId', auth, commentCtrl.deleteOneComment);
router.get('/:publicationId/comments', auth, commentCtrl.getAllComments);

module.exports = router;