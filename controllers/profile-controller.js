const CONSTANTS = require('../config/constants');
const HttpError = require('../models/http-error');
const Profile = require('../models/Profile');

const getMyProfile = async (request, response, next) => {
  try {
    const profile = await Profile.findOne({ user: request.user.id }).populate(
      'user',
      ['firstName', 'lastName', 'email', 'avatar']
    );
    if (!profile) {
      return next(
        new HttpError(
          'There is no profile for the user.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      user: profile,
    });
  } catch (error) {
    return next(
      new HttpError(
        'Could not load your profile.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};
exports.getMyProfile = getMyProfile;
