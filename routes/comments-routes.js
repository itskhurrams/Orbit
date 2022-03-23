const router = require('express').Router();
const commentsController = require('../controllers/comments-controller');
const { check } = require('express-validator');

router.get('/:commentId', commentsController.getCommentbyId);
router.get('/user/:userId', commentsController.getCommentsByUserId);
router.post(
  '/',
  [check('comment').not().isEmpty()],
  commentsController.postComment
);
router.patch(
  '/:commentId',
  [check('comment').not().isEmpty()],
  commentsController.updateCommentById
);
router.delete('/:commentId', commentsController.deleteCommentById);

module.exports = router;
