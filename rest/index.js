var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  db_subreddits = require('./api/models/subredditModel'),
  db_images = require('./api/models/imageModel'),
  cors = require('cors'),
  bodyParser = require('body-parser');

// sudo docker exec -it reddit_archiver_mongodb_container_1 /bin/bash
//  sudo docker exec -it reddit_archiver_mongodb_container_1 /usr/bin/mongo reddit --eval "db.dropDatabase();"
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://database:27017/reddit', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log("Connected to MongoDB");
})

mongoose.connection.on('error', (err) => {
  console.log("DB Connection Error: " + err);
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var routesSubreddits = require('./api/routes/subredditRoutes');
app.use('/sub', routesSubreddits);

var routesScore = require('./api/routes/imageRoutes');
app.use('/image', routesScore);

app.listen(2701);

console.log('✨ REST started on: ' + 2701);

//if(process.env.INIT == 1){
//  var init = require('./init/db_fill');
//  init.addAdmin();
//}
