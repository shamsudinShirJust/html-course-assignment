(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyItems = this;
  toBuyItems.items = ShoppingListCheckOffService.getToBuy();
  toBuyItems.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtItems = this;
  boughtItems.items = ShoppingListCheckOffService.getBought();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyArray = [
    { name: "cookies", quantity: 10},
    { name: "fishes", quantity: 5},
    { name: "pancakes", quantity: 3},
  ];

  var alreadyBoughtArray = [];

  service.getToBuy = function () {
    return toBuyArray;
  }

  service.getBought = function () {
    return alreadyBoughtArray;
  }

  service.buyItem = function (itemIdex) {
    alreadyBoughtArray.push(toBuyArray.splice(itemIdex, 1)[0]);
  };
}

})();