(function () {
'use strict';

angular.module('common')
.service('UserService', UserService);

UserService.$inject = ['MenuService'];
function UserService(MenuService) {
  var service = this;

  // Default user used to test my-info page
  // service.currentUser = {
  //   firstName: 'H',
  //   lastName: 'a',
  //   dish: 'A',
  //   email: 'c@d',
  // }

  service.setUser = function (user) {
    service.currentUser = user;
    console.log(user);
  };

  service.getUser = function (){
    if (service.currentUser) {
      if (!service.currentUser.menu_items) {
        MenuService.getMenuItems(service.currentUser.dish).then(function (response) {
          service.currentUser.menu_items = response.menu_items;
        });
      }
      return service.currentUser;
    }
  };
}


})();