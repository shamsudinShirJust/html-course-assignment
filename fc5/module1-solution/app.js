(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunch = "";
  $scope.itemHandle = function () {
    var num = splitAndCount($scope.lunch);
    if (num == 0) {
      $scope.mes = "Please enter data first";
      $scope.mstyle = {"color":"#D46A6A"};
      $scope.tstyle = {"border-color":"#D46A6A"};
    } else if (num <= 3) {
      $scope.mes = "Enjoy!";
      $scope.mstyle = {"color":"#55AA55"};
      $scope.tstyle = {"border-color":"#55AA55"};
    } else {
      $scope.mes = "Too much!";
      $scope.mstyle = {"color":"#55AA55"};
      $scope.tstyle = {"border-color":"#55AA55"};
    }
  };
  // console.log($scope)
  // $scope.$watch(function () {
  //   console.log("Fire!")
  // })
};

function splitAndCount(string) {
  var splited = string.split(',');
  var counter = 0;
  for (var i = 0; i < splited.length; i++) {
    if (splited[i]) {
      counter++;
    }
  }
  return counter;
}

})();
