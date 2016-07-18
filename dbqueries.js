'use strict';

var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'asd',
  database: 'caloriecounter',
});

con.connect(function(err){
  if(err){
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});


var funcsToCalorieApp = (function () {
  function handleError (err) {
    if(err) {
      console.log(err.toString());
      return;
    }
  }
  function getAllMeals (req, cb) {
    con.query('SELECT * FROM meals', function (err, rows) {
      handleError(err);
      cb(rows);
    });
  }
  function addNewMeal(req, cb) {
    con.query("INSERT INTO meals (name, calories, date) VALUES ('"+req.body.name+"', '"+req.body.calories+"', '"+req.body.date+"')",
    function (err, rows) {
      handleError(err);
      cb({name: req.body.name, calorie:req.params.calories, date:req.body.date});
    });
  }
  return {
    getAllMeals:getAllMeals,
    addNewMeal:addNewMeal
  };
})();


module.exports = funcsToCalorieApp;
