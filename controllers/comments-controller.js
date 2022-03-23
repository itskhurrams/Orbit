const CONSTANTS = require('../models/constants');
const HttpError = require('../models/http-error');
const uuid = require('uuid');
const { validationResult } = require('express-validator');

let DUMMY_USER_COMMENTS = [
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
const postComment = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Invalid input passed, please check your data.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
  const {
    title,
    description,
    userId,
    displayName,
    companyId,
    comment,
    createdBy,
  } = request.body;

  const postedComment = {
    id: uuid.v4(),
    title,
    description,
    userId,
    displayName,
    companyId,
    comment,
    createdBy,
  };
  DUMMY_USER_COMMENTS.push(postedComment);
  response
    .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED)
    .json({ comment: postedComment });
};
const updateCommentById = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Invalid input passed, please check your data.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
  const { comment } = request.body;
  const commentId = request.params.commentId;

  const updatedcomment = {
    ...DUMMY_USER_COMMENTS.find((comment) => comment.id === commentId),
  };
  const updatedIndex = DUMMY_USER_COMMENTS.findIndex(
    (comment) => comment.id === commentId
  );
  updatedcomment.comment = comment;
  DUMMY_USER_COMMENTS[updatedIndex] = updatedcomment;
  response
    .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK)
    .json({ comment: updatedcomment });
};
const deleteCommentById = (request, response, next) => {
  const commentId = request.params.commentId;
  if (!DUMMY_USER_COMMENTS.find((comment) => comment.id === commentId)) {
    return next(
      new HttpError(
        'Could not found comment with that Id.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
      )
    );
  }
  DUMMY_USER_COMMENTS = DUMMY_USER_COMMENTS.filter(
    (comment) => comment.id !== commentId
  );
  response
    .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK)
    .json({ message: 'Comment has been delete successfully.' });
};

exports.getCommentbyId = getCommentbyId;
exports.getCommentsByUserId = getCommentsByUserId;
exports.postComment = postComment;
exports.updateCommentById = updateCommentById;
exports.deleteCommentById = deleteCommentById;
