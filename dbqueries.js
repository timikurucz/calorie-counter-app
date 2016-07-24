'use strict';

var funcsToCalorieApp = (function (con) {
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established');
  });

  function handleError (err) {
    if(err) {
      console.log(err.toString());
      return;
    }
  }

  function getAllMeals (cb) {
    con.query('SELECT * FROM meals', function (err, rows) {
      handleError(err);
      cb({meals:rows});
    });
  }

  function getFilteredMeals (date, cb) {
    console.log(date);
    con.query('SELECT * FROM meals WHERE meals.date LIKE ' + '"' + date + '%' + '";', function (err, rows) {
      handleError(err);
      cb(rows);
    });
  }

  function addNewMeal(item, cb) {
    con.query("INSERT INTO meals (name, calories, date) VALUES ('" +item.name+ "','" +item.calories+ "','" +item.date+ "')",
    function (err, rows) {
      handleError(err);
      cb({id: rows.insertId, name: item.name, calories:item.calories, date:item.date});
    });
  }

// for deleting only one meal:
  function deleteMeal(id, cb) {
  con.query('DELETE FROM meals WHERE id = ?', id, function (err, rows) {
    handleError(err);
    cb(rows);
  });
  }


// delete multiple meals with sending an object with an array:
  function deleteMeals(item, cb) {
    var idsString = item.item_ids.join(',');
    con.query("DELETE FROM meals WHERE id IN (" +idsString+ ')', function (err, rows) {
    handleError(err);
    cb({item_ids: item.item_ids});
  });
  }

  return {
    getAllMeals:getAllMeals,
    addNewMeal:addNewMeal,
    deleteMeal:deleteMeal,
    deleteMeals:deleteMeals,
    getFilteredMeals:getFilteredMeals
  };
});


module.exports = funcsToCalorieApp;
