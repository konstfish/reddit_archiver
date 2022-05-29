'use strict';

var mongoose = require('mongoose'),
 Images = mongoose.model('Images');


exports.addImage = function(sub, callback){
  sub.save(function(err, task) {
    callback(err, task)
  });
}

exports.getImages = function(sub, callback){
    const query = {subreddit: sub}

    Images.find(query, function(err, task) {
        callback(err, task);
    }).sort({created_utc: 1});;
}

exports.getSavedImages = function(callback){
    const query = {saved: 1}

    Images.find(query, function(err, task) {
        callback(err, task);
    }).sort({created_utc: 1});
}

exports.get3Images = function(sub, callback){
    const query = {subreddit: sub}

    Images.aggregate([{ $match: query }]).sample(3).exec(function (err, task) {
        callback(err, task);
    });
}

exports.getImage = function(query, callback){
    Images.find(query, function(err, task) {
        callback(err, task);
    });
}

exports.countImages = function(callback){
  Images.count({}, function(err, task) {
    callback(err, task);
  });
}

exports.countImage = function(sub, callback){
    const query = {subreddit: sub}

    Images.count(query, function(err, task) {
        callback(err, task);
    });
}