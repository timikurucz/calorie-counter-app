'use strict';

var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asd',
  database: 'caloriecounter',
  timezone: 'utc',
});

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(express.static('./client'));

var db = require('./dbqueries');
var dbQueries = db(con);

app.get('/meals', function (req, res) {
  if (req.query.date) {
    dbQueries.getFilteredMeals(req.query.date, function (result) {
      console.log(JSON.stringify(result));
      // res.send(result);
      res.send(JSON.stringify(result));
    });
  } else {
  dbQueries.getAllMeals(function(rows){
    res.send(rows);
  });
  }
});


app.post('/meals', urlencodedParser, function(req, res) {
  dbQueries.addNewMeal(req.body, function(rows){
    res.send(rows);
  });
});

//jo-backend-egy torlesre:
app.delete('/meals/:id', urlencodedParser, function (req, res) {
  dbQueries.deleteMeal(req.params.id, function(rows){
    if (rows.affectedRows === 1) {
      res.send({status: 'ok', meal: {id: parseInt(req.params.id)}});
    } else {
      res.send({ status: 'not exists' });
    }
  });
});


//jo tobb torlesre:
app.delete('/meals', urlencodedParser, function (req, res) {
  dbQueries.deleteMeals(req.body, function(rows){
    console.log(rows);
      res.send(rows);
  });
});


app.listen(3000);
