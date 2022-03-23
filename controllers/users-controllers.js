const CONSTANTS = require('../models/constants');
const HttpError = require('../models/http-error');
const uuid = require('uuid');
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
const signUp = (request, response, next) => {
  const { displayName, email, passcode } = request.body;
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
    next(
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
