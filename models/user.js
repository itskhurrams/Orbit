const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passcode: { type: String, required: true, minlength: 6 },
  location: [
    {
      address: { type: String, required: true },
      postcode: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
  createdDate: { type: Date, default: Date.now },
});
userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', userSchema);
