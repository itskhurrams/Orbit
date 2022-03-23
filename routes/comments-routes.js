const res = require('express/lib/response');

const router = require('express').Router();

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
router.get('/:commentId', (request, response, next) => {
  const commentId = request.params.commentId;
  const comment = DUMMY_USER_COMMENTS.find((comment) => {
    return comment.id === commentId;
  });
  if (!comment) {
    const error = new Error('Could not find comment against this Id');
    error.code = 404;
    return next(error);
  }

  response.json({ comment });
});
router.get('/user/:userId', (request, response, next) => {
  const userId = request.params.userId;
  const comment = DUMMY_USER_COMMENTS.filter((comment) => {
    return comment.userId === userId;
  });
  if (!comment || comment.length == 0) {
    const error = new Error('No comments found against this User Id');
    error.code = 404;
    return next(error);
  }
  response.json({ comment });
});
module.exports = router;
