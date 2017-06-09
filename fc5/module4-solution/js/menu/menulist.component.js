(function () {
'use strict';

angular.module('MenuApp')
.component('menuList', {
  templateUrl: 'js/menu/templates/menulist.template.html',
  bindings: {
    items: '<'
  }
});

})();