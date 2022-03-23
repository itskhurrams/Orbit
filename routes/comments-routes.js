const router = require('express').Router();
const commentsController = require('../controllers/comments-controller');

router.get('/:commentId', commentsController.getCommentbyId);
router.get('/user/:userId', commentsController.getCommentsByUserId);
router.post('/', commentsController.postComment);
router.patch('/:commentId', commentsController.updateCommentById);
router.delete('/:commentId', commentsController.deleteCommentById);

module.exports = router;
