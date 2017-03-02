/**
 * Created by matthewmicallef on 16/04/2016.
 */

var wordCountController = function($scope, animationService) {
    $scope.pageClass = 'page-wordcount';

    animationService.reset();

    $scope.addSampleData = function() {
        const sampleData =
            "Hello World this is a sample test data " +
            "for the word count MapReduce animation that contains " +
            "multiple instances of the same word \n" +
            "this is a new line with a line break";

        $scope.userInput = sampleData;
    };
};