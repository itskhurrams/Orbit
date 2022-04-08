const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../config/constants');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const { json } = require('express/lib/response');
const environment = require('../config/environment');

const getUsers = async (request, response, next) => {
  response.json({ users: await User.find() });
};
const signUp = async (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    // return next(
    //   new HttpError(
    //     'Invalid Email address or data passed, please check.',
    //     CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
    //   )
    // );
    return response
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ Errors: result.array() });
  }
  const { displayName, email, passcode } = request.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
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

  //get User avatar
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  //encript password
  const salt = await bcrypt.genSalt();
  const createdUser = new User({
    displayName,
    email,
    passcode: await bcrypt.hash(passcode, salt),
    avatar,
  });

  try {
    await createdUser.save();

    const payLoad = {
      user: {
        Id: createdUser.Id,
      },
    };
    jwt.sign(
      payLoad,
      environment.JWT_SECRET,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) {
          return next(
            new HttpError(
              'Error while generating Jwt Token, please try again',
              CONSTANTS.HTTP_STATUS_CODES.HTTP_503_SERVICE_UNAVAILABLE
            )
          );
        }
        response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED).json({
          user: createdUser.toObject({ getters: true }),
          token: token,
        });
      }
    );
  } catch (error) {
    return next(
      new HttpError(
        'User creation failed, please try again later.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_500_INTERNAL_SERVER_ERROR
      )
    );
  }
  // response
  //   .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED)
  //   .json({ user: createdUser.toObject({ getters: true }), token: userToken });
};
const logIn = async (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    // return next(
    //   new HttpError(
    //     'Invalid Email address or data passed, please check.',
    //     CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
    //   )
    // );
    return response
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ errors: result.array() });
  }
  const { email, passcode } = request.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
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
