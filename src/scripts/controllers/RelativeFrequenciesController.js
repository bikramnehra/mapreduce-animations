/**
 * Created by matthewmicallef on 28/04/2016.
 */

var relativeFrequenciesController = function($scope, animationService) {
    $scope.pageClass = 'page-relativeFrequencies';

    animationService.reset();

    $scope.addSampleData = function() {
        const sampleData =
            "hi world hello";

        $scope.userInput = sampleData;
    };
};