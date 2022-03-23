const CONSTANTS = require('../models/constants');
const HttpError = require('../models/http-error');

const DUMMY_USER_COMMENTS = [
  {
    id: '1',
    userId: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    displayName: 'Khurram',
    companyId: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    comment: 'I have worked around 4 years and it was good learning experience',
    createdBy: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    creatdDate: '03/23/2022 7:11 AM',
  },
  {
    id: '2',
    userId: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    displayName: 'Shahzad',
    companyId: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    comment: 'Second Comment',
    createdBy: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    creatdDate: '03/23/2022 7:11 AM',
  },
];
const getCommentbyId = (request, response, next) => {
  const commentId = request.params.commentId;
  const comment = DUMMY_USER_COMMENTS.find((comment) => {
    return comment.id === commentId;
  });
  if (!comment) {
    return next(
      new HttpError(
        'Could not find comment against this Id',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
      )
    );
  }

  response.json({ comment });
};
const getCommentsByUserId = (request, response, next) => {
  const userId = request.params.userId;
  const comment = DUMMY_USER_COMMENTS.filter((comment) => {
    return comment.userId === userId;
  });
  if (!comment || comment.length == 0) {
    return next(
      new HttpError(
        'No comments found against this User Id',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
      )
    );
  }
  response.json({ comment });
};

exports.getCommentbyId = getCommentbyId;
exports.getCommentsByUserId = getCommentsByUserId;
