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
const getPostById = async (request, response, next) => {
  try {
    const post = await Post.findById(request.params.postId);
    if (!post) {
      return next(
        new HttpError(
          'Post not found.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      post: post,
    });
  } catch (error) {
    if (error.kind == 'ObjectId') {
      return next(
        new HttpError(
          'Post not found in CATCH',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    return next(
      new HttpError(
        'Server error' + error.toString(),
        CONSTANTS.HTTP_STATUS_CODES.HTTP_500_INTERNAL_SERVER_ERROR
      )
    );
  }
};
const deletePostById = async (request, response, next) => {
  try {
    const post = Post.findById(request.params.postId);
    if (post.user.toString() !== request.user.Id) {
      return next(
        new HttpError(
          'Not authorize to delete the post.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
        )
      );
    }
    await Post.remove();
    response.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      msg: 'Removed successfully.',
    });
  } catch (error) {
    return next(
      new HttpError(
        'Could not load your profile.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};
exports.createMyPost = createMyPost;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.deletePostById = deletePostById;
