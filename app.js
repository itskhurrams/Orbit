const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const commentsRoutes = require('./routes/comments-routes');
const userRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
const CONSTANTS = require('./config/constants');
var config = require('./config/env-config');
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
mongoose
  .connect(config.dataBaseUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log('Server listening at ' + config.endpoint + ':' + config.port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
