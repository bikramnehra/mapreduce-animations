/**
 * Created by matthewmicallef on 05/04/2016.
 */

var menuController = function($scope, animationService, $timeout) {
    $ = jQuery;
    $scope.showLoader = false;
    $scope.mapperPerLine = false;
    $scope.showMenu = true;

    $scope.toggleMapperPerLine = function() {
        $scope.mapperPerLine = !$scope.mapperPerLine;
    };

    $scope.toggleMenu = function() {
        $scope.showMenu = !$scope.showMenu;
        if($scope.showMenu) {
            $("#menuOptions").slideDown("slow");
        } else {
            $("#menuOptions").slideUp("slow");
        }
    };

    $scope.toggleUseCombiners = function() {
        animationService.toggleUseCombiners();
    };

    $scope.toggleShowPartitioners = function() {
        animationService.toggleShowPartitioners();
    };

    $scope.runMapReduce = function() {
        Utils.MapReduce.reset();

        $scope.showLoader = true;

        $timeout(function() {
            if($scope.name === "WordCount") {
                WordCount.setAnimationService(animationService);

                WordCount.runWordCountMapReduce(
                    document.getElementById("numberOfMappersInput").value,
                    document.getElementById("numberOfReducersInput").value,
                    $scope.mapperPerLine,
                    $scope.userInput
                );

                $scope.showLoader = false;
                animationService.toggleAnimationDisabled();
            } else if ($scope.name === "Mean") {
                Mean.setAnimationService(animationService);

                Mean.runMeanMapReduce(
                    document.getElementById("numberOfMappersInput").value,
                    document.getElementById("numberOfReducersInput").value,
                    $scope.mapperPerLine,
                    $scope.userInput
                );

                $scope.showLoader = false;
                animationService.toggleAnimationDisabled();
            } else if ($scope.name === "RelativeFrequencies") {
                RelativeFrequencies.setAnimationService(animationService);

                RelativeFrequencies.runRelativeFrequenciesMapReduce(
                    document.getElementById("numberOfMappersInput").value,
                    document.getElementById("numberOfReducersInput").value,
                    $scope.mapperPerLine,
                    $scope.userInput
                );

                $scope.showLoader = false;
                animationService.toggleAnimationDisabled();
            }

        }, 100);

        var menuRightIcon = document.getElementsByClassName("glyphicon-menu-right");
        var menuDownIcon = document.getElementsByClassName("glyphicon-menu-down");
        for(var i = 0; i < menuRightIcon.length; i++) {
            $(menuRightIcon[i]).toggleClass("closed");
            $(menuDownIcon[i]).toggleClass("closed");
        }
    };
};