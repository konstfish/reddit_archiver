'use strict';

var mongoose = require('mongoose'),
 Subreddit = mongoose.model('Subreddit');


exports.addSubreddit = function(sub, callback){
  sub.save(function(err, task) {
    callback(err, task)
  });
}

exports.getSubreddits = function(callback){
  Subreddit.find({}, function(err, task){
    callback(err, task);
  }).sort({favorite: -1, subreddit: 1});
}

exports.getSubreddit = function(sub, callback){
  const query = {subreddit: sub}

  Subreddit.find(query, function(err, task) {
    callback(err, task);
  });
}

exports.favSubreddit = function(sub, fav, callback){
  const query = {subreddit: sub}
  const update = {favorite: fav}

  Subreddit.findOneAndUpdate(query, update, function(err, task) {
    callback(err, task);
  });
}

exports.countSubreddits = function(callback){
  Subreddit.count({}, function(err, task) {
    callback(err, task);
  });
}

