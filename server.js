var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var moment = require("moment");

var cheerio = require("cheerio");
var request = require("request");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();


