'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(express.static('./client'));

var dbQueries = require('./dbqueries');
console.log(dbQueries);
app.get('/meals', function (req, res) {
  dbQueries.getAllMeals(req, function(rows){
    res.send(rows);
  });
});


app.post('/meals', urlencodedParser, function(req, res) {
  dbQueries.addNewMeal(req, function(rows){
    res.send(rows);
  });
});


app.listen(3000);
