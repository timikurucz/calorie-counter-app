'use strict';

funcsForRequires.getAllMeals('/meals');


domOperations.addButton.addEventListener('click', function(){
  funcsForRequires.addNewMeal();
});

domOperations.delButton.addEventListener('click', function(event){
  var selectedMealsIds = domOperations.getSelectedMealsIds();
  if (selectedMealsIds.length > 1) {
    conf = confirm('Are you sure you want to delete these ' + selectedMealsIds.length + ' meals?');
  } else {
    var conf = confirm('Are you sure you want to delete this meal?');
  }
  if (conf === true) {
    funcsForRequires.delMeals();
  }
});

domOperations.filterButton.addEventListener('click', function(event){
  funcsForRequires.getAllFilteredMeals();
});

domOperations.showAllButton.addEventListener('click', function(event){
  funcsForRequires.getAllMeals('/meals');
});


// for loop version:
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

// function delMeal(id) {
//   var endPoint = '/meals/'+ id;
//   xhrRequests.createRequest('DELETE', endPoint, null, domOperations.delOneMeal);
// }


// filter only on frontend:
// domOperations.filterButton.addEventListener('click', function(event){
//     domOperations.getFilteredMeals();
// });
