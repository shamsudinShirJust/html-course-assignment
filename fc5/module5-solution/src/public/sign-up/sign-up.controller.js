(function () {
'use strict';

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', 'MenuService', 'UserService']
function SignUpController($scope, MenuService, UserService) {
  var reg = this;
  reg.validMenu = false;

  reg.submit = function () {
    checkMenu(reg.user.dish).then(function (validMenu) {
      if (validMenu) {
        UserService.setUser(reg.user);
        reg.completed = true;
      }
    });
  };

  reg.resetValidMenu = function () {
    $scope.regForm.dish.$setValidity('validMenu', true);
  };

  reg.questDish = function () {
    if (reg.user.dish && reg.user.dish !== "")  {
      checkMenu(reg.user.dish);
    }
  };

  function checkMenu(short_name) {
    return MenuService.getMenuItems(short_name).then(function (response) {
      if (response.menu_items.length) {
        reg.user.menu_items = response.menu_items;
        $scope.regForm.dish.$setValidity('validMenu', true);
        return true;
      } else {
        $scope.regForm.dish.$setValidity('validMenu', false);
        return false;
      }
    });
  };
}

})();