const User = require('../models/user');

const getAuthenticatedUsers = async (request, response, next) => {
  response.json({ user: await User.findById(request.user.Id) });
};
exports.getAuthenticatedUsers = getAuthenticatedUsers;
