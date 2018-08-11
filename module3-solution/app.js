(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;


}





NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;



  menu.clickResponse = function(searchKey){
    var promise = MenuSearchService.getMatchedMenuItems(searchKey);
    promise.then(function (response) {
    menu.found = response;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  };


  console.log(menu.foundItems)

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1)
  };
}



MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url:  "https://davids-restaurant.herokuapp.com/menu_items.json",
    }).then(function (result) {
        // process result and only keep items that match
        var categories = result.data;

        var foundItems = [];
        var i = 0;
        if(searchTerm != "" && searchTerm != undefined  ){
          for (i = 0; i < categories.menu_items.length; i++) {
            var description = categories.menu_items[i].description;

            if (description.indexOf(searchTerm) != -1) {

              foundItems.push(categories.menu_items[i])
            }

          }
        }

        return foundItems;
    });
  };



}


})();
