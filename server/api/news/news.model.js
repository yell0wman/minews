'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: String,
  content_snippet: String,
  link: String,
  author: String,
  published_date: Date
});

module.exports = mongoose.model('News', NewsSchema);
