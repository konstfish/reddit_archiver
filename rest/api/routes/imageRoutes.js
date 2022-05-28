'use strict';
var controller = require('../controllers/imageController');

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Images = mongoose.model('Images');

router.post('/addImage', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;
    const title = req.body.title;
    const file = req.body.file;
    const nsfw = req.body.nsfw;
    const saved = req.body.saved;
    const date = req.body.created_utc;
    const width = req.body.width;
    const height = req.body.height;
    const permalink = req.body.permalink;

    let newImage = new Images(
    {
        created_utc: date,
        subreddit: subreddit_name,
        title: title,
        file: file,
        nsfw: nsfw,
        saved: saved,
        permalink: permalink,
        width: width,
        height: height
    });

    controller.addImage(newImage, (err, task) => {
        if(err) throw err;
        res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.post('/getImages', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;

    controller.getImages(subreddit_name, (err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.get('/getSavedImages', (req, res) => {
  try{

    controller.getSavedImages((err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.post('/getSampleImages', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;

    controller.get3Images(subreddit_name, (err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.post('/getImage', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;
    const title = req.body.title;
    const file = req.body.file;
    const nsfw = req.body.nsfw;
    const saved = req.body.saved;
    const date = req.body.created_utc;
    const permalink = req.body.permalink;

    const query = {
        subreddit: subreddit_name,
        created_utc: date,
        title: title,
        file: file,
        nsfw: nsfw,
        saved: saved,
        permalink: permalink
    }

    controller.getImage(query, (err, task) => {
        if(err) throw err;
        res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.get('/countImage', (req, res) => {
  try{
    const subreddit_name = req.body.subreddit;

    controller.countImage(subreddit_name, (err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

router.get('/countImages', (req, res) => {
  try{
    controller.countImages((err, task) => {
      if(err) throw err;
      res.json(task);
    })
  }catch(e){
    console.log(e);
    res.status(400).json({success: false, msg: e})
  }
});

module.exports = router;
