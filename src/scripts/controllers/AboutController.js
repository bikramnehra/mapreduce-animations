/**
 * Created by matthewmicallef on 23/04/2016.
 */

var aboutController = function($scope) {
    $scope.pageClass = 'page-about';
    $scope.readMoreAboutTheSite = false;
    $scope.readMoreAboutMapReduce = false;

    $scope.toggleReadMoreAboutTheSite = function() {
        $scope.readMoreAboutTheSite = !$scope.readMoreAboutTheSite;
    };

    $scope.toggleReadMoreAboutMapReduce = function() {
        $scope.readMoreAboutMapReduce = !$scope.readMoreAboutMapReduce;
    };
};