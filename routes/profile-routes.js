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
router.get('/user/:userId', profileController.getProfileByUser);
router.get('/me', authMiddleware, profileController.getMyProfile);
router.get('/', profileController.getProfiles);

module.exports = router;
