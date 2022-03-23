const router = require('express').Router();
const usersController = require('../controllers/users-controllers');

router.get('/', usersController.getUsers);
router.post('/signup', usersController.signUp);
router.post('/login', usersController.logIn);

module.exports = router;
