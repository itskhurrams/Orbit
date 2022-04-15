const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const CONSTANTS = require('../config/constants');
const HttpError = require('../models/http-error');
const Profile = require('../models/Profile');

const getProfiles = async (request, response, next) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstName',
      'lastName',
      'email',
      'title',
    ]);
    if (!profiles) {
      return next(
        new HttpError(
          'There is no profiles at the moment.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      users: profiles,
    });
  } catch (error) {
    return next(
      new HttpError(
        'No Profile found.' + error.toString(),
        CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
      )
    );
  }
};
const getProfileByUser = async (request, response, next) => {
  try {
    const profile = await Profile.findOne({
      user: request.params.userId,
    }).populate('user', ['firstName', 'lastName', 'email', 'title']);
    if (!profile) {
      return next(
        new HttpError(
          'Profile not found in TRY',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      users: profile,
    });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return next(
        new HttpError(
          'Profile not found in CATCH',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    return next(
      new HttpError(
        'Server error' + error.toString(),
        CONSTANTS.HTTP_STATUS_CODES.HTTP_500_INTERNAL_SERVER_ERROR
      )
    );
  }
};
const createMyProfile = async (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ Errors: result.array() });
  }

  const {
    avatar = gravatar.url(request.user.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    }),
    bio,
    company,
    website,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    experience,
    education,
  } = request.body;
  const profileObject = {};

  profileObject.user = request.user.Id;
  profileObject.avatar = avatar;
  if (company) profileObject.company = company;
  if (bio) profileObject.bio = bio;
  if (website) profileObject.website = website;
  if (skills)
    profileObject.skills = skills.split(',').map((skill) => skill.trim());
  profileObject.social = {};
  if (youtube) profileObject.social.youtube = youtube;
  if (twitter) profileObject.social.twitter = twitter;
  if (facebook) profileObject.social.facebook = facebook;
  if (linkedin) profileObject.social.linkedin = linkedin;
  if (instagram) profileObject.social.instagram = instagram;
  try {
    //Update
    let userProfile = await Profile.findOne({ user: request.user.id });
    if (userProfile) {
      userProfile = await Profile.findOneAndUpdate(
        {
          user: request.user.Id,
        },
        {
          $set: profileObject,
        },
        {
          new: true,
        }
      );
      return response
        .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED)
        .json({
          profile: userProfile.toObject({ getters: true }),
        });
    }
    //Create
    userProfile = new Profile(profileObject);
    await userProfile.save();
    return response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED).json({
      profile: userProfile.toObject({ getters: true }),
    });
  } catch (error) {
    return next(
      new HttpError(
        'Profile creation failed, Please try again later.' + error.toString(),
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};
const getMyProfile = async (request, response, next) => {
  try {
    const profile = await Profile.findOne({ user: request.user.id }).populate(
      'user',
      ['firstName', 'lastName', 'email']
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

const deleteProfileByUser = async (request, response, next) => {
  try {
    console.log(request.user);
    await Profile.findOneAndDelete({ user: request.user.Id });
    await User.findOneAndDelete({ _id: request.user.Id });
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      msg: 'Removed successfully.',
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
exports.getProfiles = getProfiles;
exports.createMyProfile = createMyProfile;
exports.getProfileByUser = getProfileByUser;
exports.deleteProfileByUser = deleteProfileByUser;
