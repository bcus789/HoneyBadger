var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var cheerio = require('cheerio');
var request = require('request');

var db = require('./models');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send(index.html);
});

app.get('/scrape', function(req, res) {
  request('https://www.atlasobscura.com/articles', function(
    error,
    response,
    html,
  ) {
    var $ = cheerio.load(html);

    $('.title-link').each(function(i, element) {
      var title = $(element)
        .children()
        .text();
      var link = $(element).attr('href');
      var snippet = $(element)
        .siblings('p')
        .text()
        .trim();

      var result = {
        title: title,
        link: link,
        snippet: snippet,
        articleCreated: articleCreated,
        isSaved: false,
      };

      console.log(result);

      db.Article.findOne({ title: title })
        .then(function(data) {
          console.log(data);

          if (data === null) {
            db.Article.create(result).then(function(dbArticle) {
              res.json(dbArticle);
            });
          }
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  });
});
var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true,
});

// Start the server
app.listen(PORT, function() {
  console.log('App running on port ' + PORT + '!');
});
