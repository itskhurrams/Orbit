const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passcode: { type: String, required: true, minlength: 6 },
  avatar: { type: String },
  createdDate: { type: Date, default: Date.now },
  // image: { type: String, required: true },
  // createdBy: { type: String, required: true },
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', userSchema);
