(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.input_text = "";
        $scope.output_text = "";
        $scope.output_text_color = "green";

        $scope.checkLunch = function() {
            var lunchItems = getLunchItems();
            var counter = 0;
            for (var i = 0; i < lunchItems.length; i++) {
                if (lunchItems[i] !== "") {
                    counter++;
                }
            }

            if (counter == 0) {
                $scope.output_text_color = "red";
                $scope.output_text = "Please enter data first";
                return; // Return the function, do not check the other conditions
            }

            $scope.output_text_color = "green";
            if (counter <= 3) {
                $scope.output_text = "Enjoy!"
            } else {
                $scope.output_text = "Too much!"
            }

        };

        function getLunchItems() {
            // Remove white spaces
            var lunchItems = $scope.input_text.replace(/ /g, '');
            lunchItems = lunchItems.split(",");
            return lunchItems;
        }
    }

})();