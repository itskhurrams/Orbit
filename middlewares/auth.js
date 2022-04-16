const jwt = require('jsonwebtoken');
const environment = require('../config/environment');
const HttpError = require('../models/HttpError');
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
    const decoded = jwt.verify(token.toString(), environment.JWT_SECRET);
    request.user = decoded.user;
    next();
    // jwt.verify(token.toString(), environment.JWT_SECRET, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //     return next(
    //       new HttpError(
    //         'Token Verification Error',
    //         CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
    //       )
    //     );
    //   } else next();
    // });
  } catch (error) {
    return next(
      new HttpError(
        'Token is not valid',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
      )
    );
  }
};
