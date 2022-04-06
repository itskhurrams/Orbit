const express = require('express');
const enviroment = require('./config/environment');
const databaseConfig = require('./config/database-config');
const middlewares = require('./middlewares/error-handlers');

const app = express();
app.use(
  express.json({ extended: false, useNewUrlParser: true, useCreateIndex: true })
);

app.use('/api/comments', require('./routes/comments-routes'));
app.use('/api/users', require('./routes/user-routes'));
app.use('/api/auth', require('./routes/auth-routes'));
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
