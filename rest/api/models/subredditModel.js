'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubredditSchema = new Schema({
  subreddit: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    required: false
  },
});

module.exports = mongoose.model('Subreddit', SubredditSchema);
