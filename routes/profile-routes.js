const router = require('express').Router();
const { check } = require('express-validator');

const profileController = require('../controllers/profile-controller');
const authMiddleware = require('../middlewares/auth');

router.get('/me', authMiddleware, profileController.getMyProfile);

module.exports = router;
