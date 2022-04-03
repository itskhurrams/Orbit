const CONSTANTS = require('../config/constants');
const HttpError = require('../models/HTTPError');
const uuid = require('uuid');
const { validationResult } = require('express-validator');

const User = require('../models/user');

let DUMMY_USER = [
  {
    id: '1',
    displayName: 'Khurram',
    email: 'itskhurrams@gmail.com',
    passcode: '123456',
  },
  {
    id: '2',
    displayName: 'shahzad',
    email: 'itskhurrams@outlook.com',
    passcode: '123456',
  },
];
const getUsers = (request, response, next) => {
  response.json({ users: DUMMY_USER });
};
const signUp = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Invalid Email address or data passed, please check.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
  const { displayName, email, passcode } = request.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError(
        'Signing up failed, Please try again later.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }

  if (existingUser) {
    return next(
      new HttpError(
        'User exist already, Please login instead.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_500_INTERNAL_SERVER_ERROR
      )
    );
  }

  const createdUser = new User({
    displayName,
    email,
    passcode,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError(
        'User creation failed, please try again later.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_500_INTERNAL_SERVER_ERROR
      )
    );
  }
  response
    .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED)
    .json({ user: createdUser.toObject({ getters: true }) });
};
const logIn = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Invalid Email address or data passed, please check.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
  const { email, passcode } = request.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError(
        'Logging In failed, Please try again later.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }

  if (!existingUser || existingUser.passcode !== passcode) {
    return next(
      new HttpError(
        'Invalid credentials, could not log you In.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
      )
    );
  }

  response.json({ message: 'Logged IN' });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;