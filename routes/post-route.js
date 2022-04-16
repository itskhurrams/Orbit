const router = require('express').Router();
const { check } = require('express-validator');

const postController = require('../controllers/post-controller');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/',
  [authMiddleware, check('text', 'Text is required.').not().isEmpty()],
  postController.createMyPost
);

module.exports = router;
