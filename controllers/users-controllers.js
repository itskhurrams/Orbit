const CONSTANTS = require('../config/constants');
const HttpError = require('../models/http-error');
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
  const validationErrors = validationResult(request);
  if (!validationErrors.isEmpty())
    return next(
      new HttpError(
        'Invalid Email address or data passed, please check.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  const { displayName, email, passcode } = request.body;

  // const hasUser = DUMMY_USER.find((user) => user.email === email);
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

  if (existingUser)
    return next(
      new HttpError(
        'Could not create user, email already exist.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_500_INTERNAL_SERVER_ERROR
      )
    );

  const createdUser = {
    id: uuid.v4(),
    displayName,
    email,
    passcode,
  };
  DUMMY_USER.push(createdUser);
  response
    .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK)
    .json({ user: createdUser });
};
const logIn = (request, response, next) => {
  const { email, passcode } = request.body;
  const IdentifiedUser = DUMMY_USER.find((user) => user.email === email);
  if (!IdentifiedUser || IdentifiedUser.passcode !== passcode) {
    return next(
      new HttpError(
        'Could not identify user, credentials seems wrong.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
      )
    );
  }
  response.json({ message: 'Logged IN' });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
