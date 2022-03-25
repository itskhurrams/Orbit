const router = require('express').Router();
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

router.get('/', usersController.getUsers);
router.post(
  '/signup',
  [check('email').not().isEmpty().normalizeEmail().isEmail()],
  usersController.signUp
);
router.post('/login', usersController.logIn);

module.exports = router;
