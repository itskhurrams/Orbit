const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passcode: { type: String, required: true, minlength: 6 },

  createdDate: { type: Date, default: Date.now },
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', userSchema);
