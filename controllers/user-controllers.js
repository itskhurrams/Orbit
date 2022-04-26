const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../config/constants');
const HttpError = require('../models/HttpError');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const environment = require('../config/environment');

// @route   GET api/users
// @desc    Get All user
// @access  Public
const getUsers = async (req, res, next) => {
  res.json({ users: await User.find() });
};
// @route   POST api/users/signup
// @desc    signup user
// @access  Public
const signUp = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ Errors: result.array() });
  }
  const { firstName, lastName, title, email, passcode, isCompany, location } =
    req.body;
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

  //encript password
  const salt = await bcrypt.genSalt();
  const createdUser = new User({
    firstName,
    lastName,
    title,
    email,
    passcode: await bcrypt.hash(passcode, salt),
    isCompany,
    location,
  });

  try {
    await createdUser.save();
    const payLoad = {
      user: {
        Id: createdUser.id,
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
        res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED).json({
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
  // res
  //   .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED)
  //   .json({ user: createdUser.toObject({ getters: true }), token: userToken });
};

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
const logIn = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // return next(
    //   new HttpError(
    //     'Invalid Email address or data passed, please check.',
    //     CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
    //   )
    // );
    return res
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ errors: result.array() });
  }
  const { email, passcode } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(passcode, existingUser.passcode);
    if (!existingUser || !isMatch) {
      return next(
        new HttpError(
          'Invalid credentials, could not log you In.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
        )
      );
    }
    const payLoad = {
      user: {
        Id: existingUser.id,
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
        res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED).json({
          user: {
            id: existingUser.id,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email,
            location: existingUser.location,
            createdDate: existingUser.createdDate,
          },
          token: token,
        });
      }
    );
  } catch (error) {
    return next(
      new HttpError(
        'Logging In failed, Please try again later.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.logIn = logIn;
