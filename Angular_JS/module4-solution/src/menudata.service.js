(function() {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);


    MenuDataService.$inject = ["$http"]

    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function() {

            var httpPromise = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/categories.json")
            });

            return httpPromise.then(function(response) {
                return response.data;
            });
        };

        service.getItemsForCategory = function(categoryShortName) {

            var httpPromise = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
                params: {
                    category: categoryShortName
                }
            });

            return httpPromise.then(function(response) {
                return response.data.menu_items;
            });
        };
    }





})();