const express = require('express');
const bodyParser = require('body-parser');
const commentsRoutes = require('./routes/comments-routes');
const userRoutes = require('./routes/user-routes');
const enviroment = require('./config/environment');
const databaseConfig = require('./config/database-config');
const middlewares = require('./middlewares/error-handlers');

const app = express();
app.use(bodyParser.json());

app.use('/api/comments', commentsRoutes);
app.use('/api/Users', userRoutes);
app.use(middlewares.RoutErrorHandler);
app.use(middlewares.ErrorHandler);

databaseConfig.Connected().then(() => {
  app.listen(enviroment.PORT, () => {
    console.log(
      'Server listening at ' + enviroment.API_ENDPOINT + ':' + enviroment.PORT
    );
  });
});
