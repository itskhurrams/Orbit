const mongoose = require('mongoose');
const enviroment = require('./Environment');
module.exports = {
  Connected: async () => {
    try {
      await mongoose.connect(enviroment.DATABASE_URI);
      console.log('Mongoos DB Connection is successfull.');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};
