const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const cards       = require('./routes/cards');
const users       = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cards);
app.use(users);


const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// mongoose 연결
mongoose.connect(
    'mongodb://localhost:27017/trello',
    mongooseOptions,
    (err) => {
      if (err) return console.error(err);
      console.info('mongoose connected!');
    }
  );
  mongoose.set('debug', true);


module.exports = {
  path: '/api',
  handler: app,
};
