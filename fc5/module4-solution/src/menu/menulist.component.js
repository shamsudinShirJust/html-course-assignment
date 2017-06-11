(function () {
'use strict';

angular.module('MenuApp')
.component('menuList', {
  templateUrl: 'src/menu/templates/menulist.template.html',
  bindings: {
    items: '<'
  }
});

})();