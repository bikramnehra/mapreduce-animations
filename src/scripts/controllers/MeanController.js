/**
 * Created by matthewmicallef on 17/04/2016.
 */

var meanController = function($scope, $compile, animationService) {
    $ = jQuery;
    $scope.inputList = [];
    $scope.userInput = false;
    $scope.pageClass = 'page-mean';

    animationService.reset();

    $scope.addToList = function() {
        //1. Get text in key and integer
        var k = document.getElementById('meanKeyInput').value;
        var i = document.getElementById('meanIntegerInput').value;
        $scope.inputList.push({key: k, values: i});

        //2. Call mean-label directive to create span.
        var well = document.getElementById('meanInputList');
        var meanLabel = document.createElement('mean-label');
        meanLabel.setAttribute("key", k);
        meanLabel.setAttribute("integer", i);
        $compile(well.appendChild(meanLabel))($scope);

        if(!$scope.userInput) {
            $scope.userInput = true;
        }
    };

    $scope.hasSelectedElements = function() {
        return document.getElementsByClassName('label-info').length > 0;
    };

    $scope.removeSelectedElements = function() {
        var selectedElems = document.getElementsByClassName('label-info');
        for(var i = (selectedElems.length - 1); i >= 0; i--) {
            var key = selectedElems[i].attributes.key.nodeValue;
            var index = Utils.MapReduce.lookupArrayByKey($scope.inputList, key);
            $scope.inputList.splice(index, 1);

            $(selectedElems[i]).remove();
        }
    };

    $scope.addSampleData = function() {
        const sampleData = [
            {
                key: "hello",
                int: "1"
            },
            {
                key: "world",
                int: "2"
            },
            {
                key: "how",
                int: "1"
            },
            {
                key: "are",
                int: "3"
            },
            {
                key: "you",
                int: "5"
            }
        ];

        var well = document.getElementById('meanInputList');
        for(var i = 0; i < sampleData.length; i++) {
            $scope.inputList.push({key: sampleData[i].key, values: sampleData[i].int});

            var meanLabel = document.createElement('mean-label');
            meanLabel.setAttribute("key", sampleData[i].key);
            meanLabel.setAttribute("integer", sampleData[i].int);
            $compile(well.appendChild(meanLabel))($scope);
        }
    };
};