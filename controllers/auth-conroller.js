const User = require('../models/user');

const getAuthenticatedUsers = async (req, res, next) => {
  res.json({
    user: await User.findById(req.user.Id).select('-passcode'),
  });
};
exports.getAuthenticatedUsers = getAuthenticatedUsers;
