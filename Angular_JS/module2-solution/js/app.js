(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

        toBuyList.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            { name: "cookies", quantity: 10 },
            { name: "cakes", quantity: 3 },
            { name: "noodles", quantity: 5 },
            { name: "chips", quantity: 7 },
            { name: "cokes", quantity: 2 }
        ];

        var bougthItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        }

        service.getBoughtItems = function() {
            return bougthItems;
        }

        service.buyItem = function(index) {
            bougthItems.push(toBuyItems[index]);
            toBuyItems.splice(index, 1);
        }
    }
})();