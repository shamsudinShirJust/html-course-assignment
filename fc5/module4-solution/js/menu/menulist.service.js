(function () {
'use strict';

angular.module('MenuApp')
.service('MenuListService', MenuListService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuListService.$inject = ['$http', 'ApiBasePath'];
function MenuListService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function (response) {
      return response.data;
    });
  };


  service.getMenuForCategory = function (shortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    }).then(function (response) {
      return response.data;
    });
  };
}

})();