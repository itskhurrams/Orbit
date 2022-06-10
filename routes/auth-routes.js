const router = require('express').Router();
const { check } = require('express-validator');

const authUser = require('../controllers/auth-conroller');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, authUser.getAuthenticatedUsers);

module.exports = router;
