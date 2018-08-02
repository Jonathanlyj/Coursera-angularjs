(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var ToBuy = this;


  ToBuy.items = ShoppingListCheckOffService.getToBuys();

  ToBuy.buyItem = function (itemName, iitemQuantity, itemIdex) {
    try{
    ShoppingListCheckOffService.buyItem(itemName, iitemQuantity, itemIdex);
  }catch(error){
    ToBuy.errorMessage = error.message;
  }

  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var AlreadyBought = this;
  try{
  AlreadyBought.items = ShoppingListCheckOffService.getBoughts();
}catch(error){
  AlreadyBought.errorMessage = error.message;
}

}


function ShoppingListCheckOffService() {

  var service = this;

  // List of shopping items
  var ToBuys = [];
  var Boughts = [];


  var item1 = {
    name: 'banana',
    quantity: 5
  };
  var item2 = {
    name: 'apple',
    quantity: 4
  };
  var item3 = {
    name: 'orange',
    quantity: 3
  };
  var item4 = {
    name: 'blueberry',
    quantity: 2
  };
  var item5 = {
    name: 'melon',
    quantity: 1
  };

  ToBuys.push(item1);
  ToBuys.push(item2);
  ToBuys.push(item3);
  ToBuys.push(item4);
  ToBuys.push(item5);




  service.buyItem = function (itemName, quantity, itemIdex) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    Boughts.push(item);
    ToBuys.splice(itemIdex, 1);

    if (ToBuys.length == 0){
      throw new Error("Everything is bought!");
    }


  };

  service.getToBuys = function () {

    return ToBuys;
  };

  service.getBoughts = function () {
    // console.log(Boughts);
    if (Boughts.length > 0){
      console.log('Something!!!!');
      throw new Error("Something bought !");
     }

    return Boughts;

  };


}

})();
