const mongoose = require('mongoose');
const schema = mongoose.schema;

const userSchema = new schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passcode: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
});
