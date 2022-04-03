const mongoose = require('mongoose');
const enviroment = require('./Environment');
class DatabaseConfig {
  Connected = async () => {
    try {
      await mongoose.connect(enviroment.DATABASE_URI);
      console.log('Mongoos DB Connection is successfull.');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
}
module.exports = new DatabaseConfig();
