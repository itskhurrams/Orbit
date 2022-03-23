const express = require('express');
const bodyParser = require('body-parser');
const commentsRoutes = require('./routes/comments-routes');
const app = express();

app.use('/api/comments', commentsRoutes);

app.listen(5000, () => {
  console.log('Server listening at 5000');
});
