const gravatar = require('gravatar');
const { validationResult } = require('express-validator');
const CONSTANTS = require('../config/constants');
const HttpError = require('../models/HttpError');
const Profile = require('../models/Profile');
const Post = require('../models/Post');

// @route   POST api/posts
// @desc    Create post
// @access  Private
const createMyPost = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY)
      .json({ Errors: result.array() });
  }
  try {
    const userProfile = await Profile.findOne({
      user: req.user.Id,
    }).populate('user', ['firstName', 'lastName']);
    const newPost = new Post({
      text: req.body.text,
      name: userProfile.user.firstName + ' ' + userProfile.user.lastName,
      avatar: userProfile.avatar,
      user: req.user.Id,
    });
    //Create
    await newPost.save();
    return res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_201_CREATED).json({
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

// @route   GET api/posts
// @desc    Get posts
// @access  Public
const getPosts = async (req, res, next) => {
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
    res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
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

// @route   GET api/posts/:postId
// @desc    Get post by id
// @access  Public
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(
        new HttpError(
          'Post not found.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
        )
      );
    }
    res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
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

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
const deletePostById = async (req, res, next) => {
  try {
    const post = Post.findById(req.params.postId);
    if (post.user.toString() !== req.user.Id) {
      return next(
        new HttpError(
          'Not authorize to delete the post.',
          CONSTANTS.HTTP_STATUS_CODES.HTTP_401_UNAUTHORIZED
        )
      );
    }
    await Post.remove();
    res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
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

// @route   PUT api/posts/like/:id
// @desc    Like post
// @access  Private

const likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.Id).length >
      0
    ) {
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.Id);
      post.likes.splice(removeIndex, 1);
    } else {
      post.likes.unshift({ user: req.user.Id });
    }

    await post.save();
    res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      likes: post.likes,
    });
  } catch (error) {
    return next(
      new HttpError(
        'Could not post your status.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};

// @route   POST api/posts/comments/:postId
// @desc    Add comments to Post on basis of Post Id
// @access  Private
const commentPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userProfile = await Profile.findOne({
      user: req.user.Id,
    }).populate('user', ['firstName', 'lastName']);
    const newComment = {
      user: req.user.Id,
      text: req.body.text,
      name: userProfile.user.firstName + ' ' + userProfile.user.lastName,
      avatar: userProfile.avatar,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.status(CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK).json({
      comments: post.comments,
    });
  } catch (error) {
    return next(
      new HttpError(
        'Could not post your status.',
        CONSTANTS.HTTP_STATUS_CODES.HTTP_422_UNPROCESSABLE_ENTITY
      )
    );
  }
};

exports.createMyPost = createMyPost;
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.deletePostById = deletePostById;
exports.likePost = likePost;
exports.commentPost = commentPost;
