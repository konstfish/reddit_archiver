'use strict';
var controller = require('../controllers/subredditController');

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Subreddit = mongoose.model('Subreddit');

router.post('/addSubreddit', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;
    const fav = req.body.favorite;

    let newSubreddit = new Subreddit(
    {
        subreddit: subreddit_name,
        favorite: fav
    });

    controller.addSubreddit(newSubreddit, (err, task) => {
    if(err) throw err;
    res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.get('/getSubreddits', (req, res) => {
  try{
    controller.getSubreddits((err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.get('/getSubreddit', (req, res) => {
  const subreddit = req.body.subreddit;

  try{
    controller.getSubreddit(subreddit, (err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.post('/favSubreddit', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;
    const fav = req.body.fav;

    controller.favSubreddit(subreddit_name, fav, (err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.get('/countSubreddits', (req, res) => {
  try{
    controller.countSubreddits((err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

module.exports = router;
