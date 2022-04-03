const express = require('express');
const bodyParser = require('body-parser');
const commentsRoutes = require('./routes/comments-routes');
const userRoutes = require('./routes/UserRoutes');
const HttpError = require('./models/HTTPError');
const CONSTANTS = require('./config/Constants');
const enviroment = require('./config/Environment');
const databaseConfig = require('./config/DatabaseConfig');

const app = express();
app.use(bodyParser.json());

app.use('/api/comments', commentsRoutes);
app.use('/api/Users', userRoutes);
app.use((request, response, next) => {
  return next(
    new HttpError(
      'Could not find this route.',
      CONSTANTS.HTTP_STATUS_CODES.HTTP_404_NOT_FOUND
    )
  );
});
app.use((error, request, response, next) => {
  if (response.headerSent) {
    return next(error);
  }
  response.status(error.code || 500);
  response.json(error.message || 'Unknow error occurred !');
});

databaseConfig.Connected().then(() => {
  app.listen(enviroment.PORT, () => {
    console.log(
      'Server listening at ' + enviroment.API_ENDPOINT + ':' + enviroment.PORT
    );
  });
});
