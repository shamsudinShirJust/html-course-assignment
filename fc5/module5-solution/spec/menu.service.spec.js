describe('menucategories', function () {

  var menucategories;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menucategories = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return items list', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json?category=A').respond({data:['Lunch', 'Dessert']});
    menucategories.getMenuItems('A').then(function(response) {
      expect(response.data).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush();
  });

  it('should return empty list', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json?category=ABC').respond({data:[]});
    menucategories.getMenuItems('ABC').then(function(response) {
      expect(response.data).toEqual([]);
    });
    $httpBackend.flush();
  });

});
