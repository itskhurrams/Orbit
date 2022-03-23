const router = require('express').Router();
const usersController = require('../controllers/users-controllers');

router.get('/', commentsController.getCommentbyId);
router.post('/signup', commentsController.postComment);
router.post('/login', commentsController.updateCommentById);

module.exports = router;
