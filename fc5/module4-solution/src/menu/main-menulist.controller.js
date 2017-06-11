(function (){
'use strict';

angular.module('MenuApp')
.controller('MainMenuListController', MainMenuListController);

MainMenuListController.$inject = ['MenuListService', 'items'];
function MainMenuListController(MenuListService, items) {
  var menu = this;
  menu.items = items;
};

})();