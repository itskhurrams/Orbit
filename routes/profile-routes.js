const router = require('express').Router();
const { check } = require('express-validator');

const profileController = require('../controllers/profile-controller');
const authMiddleware = require('../middlewares/auth');

router.post(
  '/',
  [
    authMiddleware,
    check('bio', 'Bio is required.').not().isEmpty(),
    check('company', 'Company is required.').not().isEmpty(),
  ],
  profileController.createMyProfile
);
router.get('/me', authMiddleware, profileController.getMyProfile);
module.exports = router;
