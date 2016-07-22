'use strict';

function getAllMeals(p) {
  xhrRequests.createRequest('GET', p, {}, domOperations.createAllMeals);
}

getAllMeals('/meals');

function addNewMeal() {
  var mealData = {
    name: domOperations.nameInputField.value,
    calories: domOperations.calorieInputField.value,
    date: domOperations.dateInputField.value,
  };
  xhrRequests.createRequest('POST', '/meals', JSON.stringify(mealData), domOperations.createOneNewMeal);
}

domOperations.addButton.addEventListener('click', function(){
  addNewMeal();
});

domOperations.delButton.addEventListener('click', function(event){
  var selectedMealsIds = domOperations.getSelectedMealsIds();
  if (selectedMealsIds.length > 1) {
    conf = confirm('Are you sure you want to delete these ' + selectedMealsIds.length + ' meals?');
  } else {
    var conf = confirm('Are you sure you want to delete this meal?');
  }
  if (conf === true) {
    delMeals();
  }
});

//for ciklusos:
// domOperations.delButton.addEventListener('click', function(event){
//   var selectedMealsIds = domOperations.getSelectedMealsIds();
//   if (selectedMealsIds.length > 1) {
//     var conf = confirm('Are you sure you want to delete these ' + selectedMealsIds.length + ' meals?');
//   } else {
//     var conf = confirm('Are you sure you want to delete this meal?');
//   }
//   if (conf === true) {
//     console.log(selectedMealsIds);
//     for (var i = 0; i < selectedMealsIds.length; i++) {
//       delMeal(selectedMealsIds[i]);
//     }
//   }
// });
//
//
//
// function delMeal(id) {
//   var endPoint = '/meals/'+ id;
//   xhrRequests.createRequest('DELETE', endPoint, null, domOperations.delOneMeal);
// }

// // tobb torlese, id-lista elkuldesevel:
function delMeals() {
  var endPoint = '/meals';
  var itemIds = domOperations.getSelectedMealsIds();
  console.log({item_ids: itemIds});
  xhrRequests.createRequest('DELETE', endPoint, JSON.stringify({item_ids: itemIds}), domOperations.delMoreThanOneMeals);
}

// domOperations.delButton.addEventListener('click', function(event){
//   delMeals();
// });

//frontendes-megoldashoz:
// domOperations.filterButton.addEventListener('click', function(event){
//     domOperations.getFilteredMeals();
// });

function getAllFilteredMeals() {
  xhrRequests.createRequest('GET', '/meals?date=' + domOperations.filterInputField.value, {}, domOperations.newFiltered);
}

domOperations.filterButton.addEventListener('click', function(event){
    getAllFilteredMeals();
});

domOperations.showAllButton.addEventListener('click', function(event){
    getAllMeals('/meals');
});
