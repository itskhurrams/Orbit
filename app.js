const express = require('express');
const cors = require('cors');
const enviroment = require('./config/environment');
const databaseConfig = require('./config/database-config');
const middlewares = require('./middlewares/error-handlers');
const CONSTANTS = require('./config/constants');

const app = express();
var corsOptions = {
  origin: enviroment.CLIENT_ORIGIN,
  optionsSuccessStatus: CONSTANTS.HTTP_STATUS_CODES.HTTP_200_OK, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(
  express.json({ extended: false, useNewUrlParser: true, useCreateIndex: true })
);
app.use('/api/auth', require('./routes/auth-routes'));
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/profile', require('./routes/profile-routes'));
app.use('/api/post', require('./routes/post-route'));

app.use(middlewares.RoutErrorHandler);
app.use(middlewares.ErrorHandler);

databaseConfig.Connected().then(() => {
  app.listen(enviroment.PORT, () => {
    console.log(
      'Server listening at ' + enviroment.API_ENDPOINT + ':' + enviroment.PORT
    );
  });
});
