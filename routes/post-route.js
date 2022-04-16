const router = require('express').Router();
const { check } = require('express-validator');

const postController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/',
  [authMiddleware, check('text', 'Text is required.').not().isEmpty()],
  postController.createMyPost
);
router.get('/', authMiddleware, postController.getPosts);
router.get('/:postId', postController.getPostById);
router.delete('/:postId', postController.deletePostById);

module.exports = router;
