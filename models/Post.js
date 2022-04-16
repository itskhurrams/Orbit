const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: { type: String, required: true },
  name: { type: String },
  avatar: { type: String },
  createdDate: { type: Date, default: Date.now },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
      },
      name: { type: String },
      avatar: { type: String },
      createdDate: { type: Date, default: Date.now },
    },
  ],
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Post', postSchema);
