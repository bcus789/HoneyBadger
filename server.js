var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var axios = require('request');

var db = require('./models');

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/atlasObscura', {
  useNewUrlParser: true,
});

app.get('/', function(req, res) {
  res.send(index.html);
});

app.get('/scrape', function(req, res) {
  axios.get('https://www.atlasobscura.com/articles').then(function(response) {
    var $ = cheerio.load(response.data);

    $('span.title').each(function(i, element) {
      var result = {};

      result.title = $(this)
        .children('a')
        .text();
      result.link = $(this)
        .children('a')
        .attr('href');

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    res.send('Scrape Complete');
  });
});

app.get('/articles', function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function() {
  console.log('App running on port ' + PORT + '!');
});
