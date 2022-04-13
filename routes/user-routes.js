const router = require('express').Router();
const { check } = require('express-validator');

const usersController = require('../controllers/user-controllers');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, usersController.getUsers);
router.post(
  '/signup',
  [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Please enter a valid email.').normalizeEmail().isEmail(),
    check('passcode', 'Please enter a password with 6 or more characters.')
      .notEmpty()
      .isLength(6),
  ],
  usersController.signUp
);
router.post(
  '/login',
  [
    check('email', 'Email is required.').not().isEmpty(),
    check('email', 'Please enter a valid email.').normalizeEmail().isEmail(),
    check('passcode', 'Please enter a password it is required.').exists(),
  ],
  usersController.logIn
);

module.exports = router;
