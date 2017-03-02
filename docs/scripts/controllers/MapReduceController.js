/**
 * Created by matthewmicallef on 05/04/2016.
 */

var mapReduceController = function($scope, animationService) {
    $scope.showCombiners = function() {
        return animationService.isUsingCombiners();
    };

    $scope.showPartitioners = function() {
        return animationService.isShowingPartitioners();
    };
};