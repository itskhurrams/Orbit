const router = require('express').Router();
const { check } = require('express-validator');

const usersController = require('../controllers/user-controllers');

router.get('/', usersController.getUsers);

module.exports = router;
