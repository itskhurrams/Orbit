const router = require('express').Router();
const { check } = require('express-validator');

const postController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth');

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  [authMiddleware, check('text', 'Text is required.').not().isEmpty()],
  postController.createMyPost
);

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', authMiddleware, postController.getPosts);

// @route   GET api/posts/:postId
// @desc    Get post by id
// @access  Public
router.get('/:postId', postController.getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:postId', postController.deletePostById);

// @route   PUT api/posts/like/:id
// @desc    Like post
// @access  Private
router.put('/like/:postId', authMiddleware, postController.likePost);

module.exports = router;
