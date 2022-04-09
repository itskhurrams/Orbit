const User = require('../models/user');

const getAuthenticatedUsers = async (request, response, next) => {
  response.json({ users: await User.find() });
};
exports.getAuthenticatedUsers = getAuthenticatedUsers;
