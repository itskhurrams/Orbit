const HttpError = require('../models/HttpError');
const CONSTANTS = require('../config/constants');

module.exports = {
  RoutErrorHandler: (req, res, next) => {
    return next(
      new HttpError(
        'Could not find this route.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
      )
    );
  },
  ErrorHandler: (error, request, response, next) => {
    if (response.headerSent) {
      return next(error);
    }
    response.status(error.code || 500);
    response.json(error.message || 'Unknow error occurred !');
  },
};
