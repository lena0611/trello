const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  job: String
});

const cardSchema = new Schema({
  title: String,
  list: [ jobSchema ]
}, {
  versionKey: false
});


module.exports = mongoose.model('card', cardSchema);
