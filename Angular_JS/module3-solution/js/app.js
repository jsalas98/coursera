(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);



    function FoundItemsDirective() {
        var ddo = {
            templateUrl: "foundItems.html",
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundDir',
            bindToController: true,
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var found = this;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.searchTerm = "";
        ctrl.found = [];
        ctrl.showMessage = false;

        ctrl.getMatchedMenuItems = function(searchTerm) {
            if (searchTerm === "") {
                ctrl.found = [];
                ctrl.showMessage = true;
                return;
            }
            MenuSearchService.getMatchedMenuItems(searchTerm).then(
                function(response) {
                    ctrl.found = response;
                    if (ctrl.found.length == 0) {
                        ctrl.showMessage = true;
                    } else {
                        ctrl.showMessage = false;
                    }
                }
            );
        };

        ctrl.remove = function(index) {
            ctrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ["$http"]

    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {

            var foundItems = [];
            var httpPromise = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            });

            return httpPromise.then(function(response) {
                var menuItems = response.data.menu_items;
                for (var i = 0; i < menuItems.length; i++) {
                    var description = menuItems[i].description;
                    if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                        foundItems.push(menuItems[i]);
                    }
                }
                return foundItems;
            });
        };
    }
})();