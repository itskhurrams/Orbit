const router = require('express').Router();

const DUMMY_USER_COMMENTS = [
  {
    id: '1',
    userId: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    displayName: 'Khurram Shahzad',
    companyId: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    comment: 'I have worked around 4 years and it was good learning experience',
    createdBy: '0x66155E24bA0EB4aAa5f209F842260AD718f032fD',
    creatdDate: '03/23/2022 7:11 AM',
  },
];
router.get('/:commentId', (request, response, next) => {
  const commentId = request.params.commentId;
  const comment = DUMMY_USER_COMMENTS.find((comment) => {
    return comment.id === commentId;
  });
  response.json({ comment });
});
module.exports = router;
