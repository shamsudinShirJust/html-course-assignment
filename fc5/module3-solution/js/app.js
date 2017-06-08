(function (){
'use strict';

if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

angular.module('NarrowItDownApp', ['ngSanitize'])
.controller('NarrowItDownController', NarrowItDownController)
.directive('foundItems', FoundItemsDirective)
.service('MenuSearchService', MenuSearchService);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuItem.html',
    scope: {
      list: '<myList',
      // onRemove: "&",
    },
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchText = "";
  menu.filter = function () {
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchText);

    promise.then(function (result) {
      menu.found = result;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };
  menu.filter();
  menu.onRemove = function(itemIndex) {
    menu.found.splice(itemIndex, 1);
  };
}

function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: " https://davids-restaurant.herokuapp.com/menu_items.json",
    })
    return response.then(function (result) {
      var items = result.data.menu_items;
      var findItems = [];
      if (searchTerm == "") {
        findItems = items;
      } else {
        for (var i = items.length - 1; i >= 0; i--) {
          var ind = items[i].description.search(searchTerm);
          if (ind >= 0) {
            var oriDesc = items[i].description
            items[i].description = oriDesc
              .splice(ind + searchTerm.length, 0, "</mark>")
              .splice(ind, 0, "<mark>");
            findItems.push(items[i])
          }
        }
      }
      return findItems;
    });
  };
}

})();