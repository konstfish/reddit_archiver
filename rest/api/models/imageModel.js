'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  created_utc: {
    type: Date,
    required: true 
  },
  subreddit: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  nsfw: {
    type: Boolean,
    required: true
  },
  saved: {
    type: Boolean,
    required: true
  },
  permalink: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Images', ImageSchema);
