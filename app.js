const express = require('express');
const bodyParser = require('body-parser');
const commentsRoutes = require('./routes/comments-routes');
const app = express();

app.use('/api/comments', commentsRoutes);

app.use((error, request, response, next) => {
  if (response.headerSent) {
    return next(error);
  }
  response.status(error.code || 500);
  response.json(error.message || 'Unknow error occurred !');
});

app.listen(5000, () => {
  console.log('Server listening at 5000');
});
