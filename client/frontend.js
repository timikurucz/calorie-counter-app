'use strict';

var funcsForRequires = (function (){
  function getAllMeals(p) {
    xhrRequests.createRequest('GET', p, {}, domOperations.createAllMeals);
  }

  function addNewMeal() {
    var mealData = {
      name: domOperations.nameInputField.value,
      calories: domOperations.calorieInputField.value,
      date: domOperations.dateInputField.value,
    };
    xhrRequests.createRequest('POST', '/meals', JSON.stringify(mealData), domOperations.createOneNewMeal);
  }

  function delMeals() {
    var endPoint = '/meals';
    var itemIds = domOperations.getSelectedMealsIds();
    console.log( {item_ids: itemIds } );
    xhrRequests.createRequest('DELETE', endPoint, JSON.stringify({item_ids: itemIds}), domOperations.delMoreThanOneMeals);
  }

  function getAllFilteredMeals() {
    xhrRequests.createRequest('GET', '/meals?date=' + domOperations.filterInputField.value, {}, domOperations.showFilteredMeals);
  }
  return {
    getAllMeals:getAllMeals,
    addNewMeal:addNewMeal,
    delMeals:delMeals,
    getAllFilteredMeals:getAllFilteredMeals
  }
})();
