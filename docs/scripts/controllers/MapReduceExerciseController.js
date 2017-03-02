/**
 * Created by matthewmicallef on 09/06/2016.
 */

var mapReduceExerciseController = function($scope, $timeout) {
    if($scope.name === "WordCount") {
        if($scope.type === "Mapper") {
            $timeout(function() {
                WordCountExercise.Mapper.run();
            }, 1);
        } else if ($scope.type === 'Combiner') {
            $timeout(function() {
                WordCountExercise.Combiner.run();
            }, 1);
        } else if ($scope.type === "ShuffleAndSort") {
            $timeout(function() {
                WordCountExercise.ShuffleAndSort.run();
            }, 1);
        } else if ($scope.type === "Reducer") {
            $timeout(function() {
                WordCountExercise.Reducer.run();
            }, 1);
        }
    } else if ($scope.name === "Mean") {
        if($scope.type === "Mapper") {
            $timeout(function() {
                MeanExercise.Mapper.run();
            }, 1);
        } else if ($scope.type === 'Combiner') {
            $timeout(function() {
                MeanExercise.Combiner.run();
            }, 1);
        } else if ($scope.type === 'ShuffleAndSort') {
            $timeout(function() {
                MeanExercise.ShuffleAndSort.run();
            }, 1);
        } else if ($scope.type === 'Reducer') {
            $timeout(function() {
                MeanExercise.Reducer.run();
            }, 1);
        }
    } else if ($scope.name === "RelativeFrequencies") {
        if($scope.type === "Mapper") {
            $timeout(function() {
                RelativeFrequenciesExercise.Mapper.run();
            }, 1);
        } else if ($scope.type === 'Combiner') {
            $timeout(function() {
                RelativeFrequenciesExercise.Combiner.run();
            }, 1);
        } else if ($scope.type === 'ShuffleAndSort') {
            $timeout(function() {
                RelativeFrequenciesExercise.ShuffleAndSort.run();
            }, 1);
        } else if ($scope.type === 'Reducer') {
            $timeout(function() {
                RelativeFrequenciesExercise.Reducer.run();
            }, 1);
        }
    }
};