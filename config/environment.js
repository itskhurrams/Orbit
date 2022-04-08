('use strict');
const dotenv = require('dotenv');
class Environment {
  constructor() {
    dotenv.config();
    this.PORT = process.env.PORT || 9000;
    this.API_ENDPOINT = process.env.API_URL || 'http://localhost';
    this.DATABASE_NAME = process.env.DATABASE_NAME || 'DatabaseName';
    this.DATABASE_USER = process.env.DATABASE_USER || 'db_user';
    this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'db_password';
    this.DATABASE_URI = process.env.DATABASE_URI;
    this.JWT_SECRET = process.env.JWT_SECRET;
  }
}
module.exports = new Environment();
