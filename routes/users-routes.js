const router = require('express').Router();
const usersController = require('../controllers/users-controllers');
const { check } = require('express-validator');

router.get('/', usersController.getUsers);
router.post(
  '/signup',
  [check('email').not().isEmpty().normalizeEmail().isEmail()],
  usersController.signUp
);
router.post('/login', usersController.logIn);

module.exports = router;
