const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  endpoint: process.env.API_URL,
  dataBaseUri: process.env.DATABASE_URI,
};
