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

  //filteres probalkozas:
  function getFilteredMeals (date, cb) {
    console.log(date);
    con.query('SELECT * FROM meals WHERE meals.date LIKE ' + '"' + date + '%' + '";', function (err, rows) {
      // console.log(rows);
      handleError(err);
      cb(rows);
    });
  }



  function addNewMeal(item, cb) {
    con.query("INSERT INTO meals (name, calories, date) VALUES ('" +item.name+ "','" +item.calories+ "','" +item.date+ "')",
    function (err, rows) {
      // console.log(rows);
      handleError(err);
      cb({id: rows.insertId, name: item.name, calories:item.calories, date:item.date});
    });
  }

// jo egy elem torlesere:
  function deleteMeal(id, cb) {
  con.query('DELETE FROM meals WHERE id = ?', id, function (err, rows) {
    handleError(err);
    cb(rows);
  });
  }


//proba tobb torlese id-lista elkuldesevel:
  function deleteMeals(item, cb) {
    // console.log(item.item_ids);
    // console.log(idsString);
    // console.log(typeof(idsString));
    var idsString = item.item_ids.join(',');
    con.query("DELETE FROM meals WHERE id IN (" +idsString+ ')', function (err, rows) {
    handleError(err);
    // console.log(rows);
    // cb(rows);
    // cb({ id: id });
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
