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
const getAuthenticatedUsers = (request, response, next) => {
  response.json({ users: DUMMY_USER });
};
exports.getAuthenticatedUsers = getAuthenticatedUsers;
