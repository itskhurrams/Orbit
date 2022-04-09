const jwt = require('jsonwebtoken');
const environment = require('../config/environment');
const HttpError = require('../models/http-error');
const CONSTANTS = require('../config/constants');

module.exports = (request, response, next) => {
  //get token
  const token = request.header('x-auth-token');
  if (!token) {
    return next(
      new HttpError(
        'No token, authorization denied',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
      )
    );
  }

  //verify token
  try {
    jwt.verify(token, environment.JWT_SECRET, (err, result) => {
      next();
    });
  } catch (error) {
    return next(
      new HttpError(
        'Token is not valid',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
      )
    );
  }
};
