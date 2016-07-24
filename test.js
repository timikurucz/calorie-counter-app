'use strict';

var tape = require('tape');
var sinon = require('sinon');

var meal = require('./dbqueries');

tape('true', function(t) {
  t.equal(true, true);
  t.end();
});

// tape('true', function(t) {
//   t.equal(2+2, 4);
//   t.end();
// });


tape('proba have been called', function(t) {
  var callback = sinon.spy();
  callback();
  t.ok(callback.called);
  t.end();
});

tape('proba have been called with 3', function(t) {
  var callback = sinon.spy();
  callback(3);
  t.ok(callback.calledWith(3));
  t.end();
});

tape('addmeal calls query', function (t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function(){}
  };
  var testMealModule = meal(mockConnection);
  testMealModule.addNewMeal({ name: 'alma' });
  t.ok(mockConnection.query.called);
  t.end();
});


tape('addmeal calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function(){}
  };
  var testMealModule = meal(mockConnection);

  var testMeal = {
    name: 'alma',
    calories: 2,
    date: 'ma'
  };
  var expectedSQL = "INSERT INTO meals (name, calories, date) VALUES ('" +'alma'+ "','" +2+ "','" +'ma'+ "')";

  testMealModule.addNewMeal(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});


tape('delmeals calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function(){}
  };
  var testMealModule = meal(mockConnection);
  var testMeal = {
    item_ids: [1, 2, 3],
  };
  var expectedSQL = "DELETE FROM meals WHERE id IN (1,2,3)" ;

  testMealModule.deleteMeals(testMeal);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});

tape('filtermeals calls query with proper sql', function (t) {
  var mockConnection = {
    query: sinon.spy(),
    connect: function(){}
  };
  var testMealModule = meal(mockConnection);
  var expectedSQL = 'SELECT * FROM meals WHERE meals.date LIKE "ma%";';

  testMealModule.getFilteredMeals('ma');
  console.log(mockConnection.query.args);
  t.ok(mockConnection.query.calledWithMatch(expectedSQL));
  t.end();
});
