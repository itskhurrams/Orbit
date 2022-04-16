const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const CONSTANTS = require('../config/constants');
const HttpError = require('../models/HttpError');
const Profile = require('../models/Profile');
const User = require('../models/user');
const Post = require('../models/Post');

const createMyPost = async (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty()) {
    return response
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ Errors: result.array() });
  }
  try {
    const userProfile = await Profile.findOne({
      user: request.user.Id,
    }).populate('user', ['firstName', 'lastName']);
    const newPost = new Post({
      text: request.body.text,
      name: userProfile.user.firstName + ' ' + userProfile.user.lastName,
      avatar: userProfile.avatar,
      user: request.user.Id,
    });
    //Create
    await newPost.save();
    return response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED).json({
      post: newPost.toObject({ getters: true }),
    });
  } catch (error) {
    return next(
      new HttpError(
        'Post creation failed, Please try again later.' + error.toString(),
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};
const getPosts = async (request, response, next) => {
  try {
    const posts = await Post.find().sort({ createdDate: -1 });
    if (!posts) {
      return next(
        new HttpError(
          'There is no posts at the moment.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      posts: posts,
    });
  } catch (error) {
    return next(
      new HttpError(
        'No Profile found.' + error.toString(),
        CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
      )
    );
  }
};
exports.createMyPost = createMyPost;
exports.getPosts = getPosts;
