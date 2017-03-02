/**
 * Created by matthewmicallef on 25/06/2016.
 */

var relativeFrequenciesExerciseController = function($scope, $timeout) {
    $ = jQuery;

    const MAPPER_TOTAL_SCORE = 4;
    const COMBINER_TOTAL_SCORE = 4;
    const SHUFFLE_AND_SORT_TOTAL_SCORE = 6;
    const REDUCER_TOTAL_SCORE = 4;

    $scope.pageClass = 'page-exercises-relativefrequencies';
    $scope.currentExercise = 'Mapper';
    $scope.currentExerciseCorrect = false;
    $scope.totalScore = MAPPER_TOTAL_SCORE;
    $scope.currentScore = 0;
    $scope.mode = "Practice";
    $scope.answersChecked = false;

    //Individual question scores
    $scope.mapperScore = 0;
    $scope.combinerScore = 0;
    $scope.sasScore = 0;
    $scope.reducerScore = 0;

    $scope.toggleMode = function() {
        if($scope.mode === 'Test') {
            $scope.currentScore = 0;
            $scope.totalScore = 18;
            $scope.currentExercise = 'Mapper';
            $scope.answersChecked = false;

            var reset = document.getElementsByName('reset');
            reset[0].click();
            Utils.Exercise.toggleModelAnswer($timeout, true);
        } else {
            Utils.Exercise.toggleModelAnswer($timeout, false);

            if($scope.currentExercise === 'Mapper') {
                $scope.totalScore = MAPPER_TOTAL_SCORE;
            } else if ($scope.currentExercise === 'Combiner') {
                $scope.totalScore = COMBINER_TOTAL_SCORE;
            } else if ($scope.currentExercise === 'ShuffleAndSort') {
                $scope.totalScore = SHUFFLE_AND_SORT_TOTAL_SCORE;
            } else if ($scope.currentExercise === 'Reducer') {
                $scope.totalScore = REDUCER_TOTAL_SCORE;
            } else if ($scope.currentExercise === 'Result') {
                $scope.loadExercise('Mapper');
                $scope.totalScore = MAPPER_TOTAL_SCORE;
            }

            Utils.Exercise.togglePointerEvents(0, "auto");
            Utils.Exercise.togglePointerEvents(1, "auto");
            Utils.Exercise.togglePointerEvents(2, "auto");
        }
    };

    $scope.finishTest = function() {
        $scope.loadExercise('Mapper');
        $scope.mode = 'Practice';
    };

    $scope.checkAnswers = function() {
        if($scope.currentExercise === 'Mapper') {
            checkMapperAnswers();
        } else if ($scope.currentExercise === 'Combiner') {
            checkCombinerAnswers();
        } else if ($scope.currentExercise === 'ShuffleAndSort') {
            checkShuffleAndSortAnswers();
        } else if ($scope.currentExercise === 'Reducer') {
            checkReducerAnswers();
        }
    };

    $scope.loadNextExercise = function() {
        if($scope.mode === 'Test' && !$scope.answersChecked) {
            $scope.checkAnswers();
        }

        if($scope.currentExercise === 'Reducer' && $scope.mode === 'Test') {
            $scope.currentExercise = 'Result';
            return;
        }

        if($scope.mode === 'Test') {
            if($scope.currentExercise === 'Mapper') {
                $scope.currentExercise = 'Combiner';
            } else if ($scope.currentExercise === 'Combiner') {
                $scope.currentExercise = 'ShuffleAndSort';
            } else if ($scope.currentExercise === 'ShuffleAndSort') {
                $scope.currentExercise = 'Reducer';
            }

            Utils.Exercise.toggleModelAnswer($timeout, true);
        } else {
            if($scope.currentExercise === 'Mapper') {
                $scope.loadExercise('Combiner');
            } else if ($scope.currentExercise === 'Combiner') {
                $scope.loadExercise('ShuffleAndSort');
            } else if ($scope.currentExercise === 'ShuffleAndSort') {
                $scope.loadExercise('Reducer');
            }
        }

        $scope.answersChecked = false;
    };

    $scope.loadPreviousExercise = function() {
        if($scope.mode === 'Practice') {
            $scope.currentScore = 0;
        }

        if($scope.currentExercise === 'Combiner') {
            $scope.currentExercise = 'Mapper';
            $scope.totalScore = MAPPER_TOTAL_SCORE;
        } else if ($scope.currentExercise === 'ShuffleAndSort') {
            $scope.currentExercise = 'Combiner';
            $scope.totalScore = COMBINER_TOTAL_SCORE;
        } else if ($scope.currentExercise === 'Reducer') {
            $scope.currentExercise = 'ShuffleAndSort';
            $scope.totalScore = SHUFFLE_AND_SORT_TOTAL_SCORE;
        }
    };

    $scope.toggleCurrentExerciseCorrectness = function() {
        $scope.currentExerciseCorrect = !$scope.currentExerciseCorrect;
    };

    $scope.loadExercise = function(exerciseName) {
        if(exerciseName === 'Mapper') {
            $scope.totalScore = MAPPER_TOTAL_SCORE;
        } else if (exerciseName === 'Combiner') {
            $scope.totalScore = COMBINER_TOTAL_SCORE;
        } else if (exerciseName === 'ShuffleAndSort') {
            $scope.totalScore = SHUFFLE_AND_SORT_TOTAL_SCORE;
        } else if (exerciseName === 'Reducer') {
            $scope.totalScore = REDUCER_TOTAL_SCORE;
        }

        $scope.currentExercise =  exerciseName;
        $scope.currentExerciseCorrect = false;
        $scope.currentScore = 0;
    };

    var checkMapperAnswers = function() {
        $scope.mapperScore = 0;

        var pairKeys = document.getElementsByClassName('jsav-pair-key');

        if(pairKeys[0].innerHTML.split(" ").join("") === '(hello,*)') {
            Utils.Exercise.toggleElementCorrectness(pairKeys[0], true);
            $scope.mapperScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairKeys[0], false);
        }

        if(pairKeys[1].innerHTML.split(" ").join("") === '(hello,world)') {
            Utils.Exercise.toggleElementCorrectness(pairKeys[1], true);
            $scope.mapperScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairKeys[1], false);
        }

        if(pairKeys[2].innerHTML.split(" ").join("") === '(world,*)') {
            Utils.Exercise.toggleElementCorrectness(pairKeys[2], true);
            $scope.mapperScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairKeys[2], false);
        }

        if(pairKeys[3].innerHTML.split(" ").join("") === '(world,hello)') {
            Utils.Exercise.toggleElementCorrectness(pairKeys[3], true);
            $scope.mapperScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairKeys[3], false);
        }

        if($scope.mapperScore === MAPPER_TOTAL_SCORE) {
            $scope.toggleCurrentExerciseCorrectness();
        }

        if($scope.mode === 'Practice') {
            $scope.currentScore = $scope.mapperScore;
        } else {
            $scope.currentScore += $scope.mapperScore;
            Utils.Exercise.togglePointerEvents(1, "none");
        }
    };

    var checkCombinerAnswers = function() {
        $scope.combinerScore = 0;

        var pairKeys = document.getElementsByClassName('jsav-pair-key');
        var pairValues = document.getElementsByClassName('jsav-pair-values');

        if(pairKeys[4].innerHTML.split(" ").join("") === '(hello,*)') {
            Utils.Exercise.toggleElementCorrectness(pairKeys[4], true);
            $scope.combinerScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairKeys[4], false);
        }

        if(pairKeys[5].innerHTML.split(" ").join("") === '(hello,hello)') {
            Utils.Exercise.toggleElementCorrectness(pairKeys[5], true);
            $scope.combinerScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairKeys[5], false);
        }

        if(pairValues[4].innerHTML.split(" ").join("") === '2') {
            Utils.Exercise.toggleElementCorrectness(pairValues[4], true);
            $scope.combinerScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairValues[4], false);
        }

        if(pairValues[5].innerHTML.split(" ").join("") === '2') {
            Utils.Exercise.toggleElementCorrectness(pairValues[5], true);
            $scope.combinerScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairValues[5], false);
        }

        if($scope.combinerScore === COMBINER_TOTAL_SCORE) {
            $scope.toggleCurrentExerciseCorrectness();
        }

        if($scope.mode === 'Practice') {
            $scope.currentScore = $scope.combinerScore;
        } else {
            $scope.currentScore += $scope.combinerScore;
            Utils.Exercise.togglePointerEvents(1, "none");
            Utils.Exercise.togglePointerEvents(2, "none");
        }
    };

    var checkShuffleAndSortAnswers = function() {
        $scope.sasScore = 0;

        var pairValues = document.getElementsByClassName('jsav-pair-values');
        var pairIDContainers = document.getElementsByClassName('idContainer');

        if(pairValues[4].innerHTML.split(" ").join("") === '1') {
            Utils.Exercise.toggleElementCorrectness(pairValues[4], true);
            $scope.sasScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairValues[4], false);
        }

        if(pairValues[5].innerHTML.split(" ").join("") === '2,3') {
            Utils.Exercise.toggleElementCorrectness(pairValues[5], true);
            $scope.sasScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairValues[5], false);
        }

        if(pairValues[6].innerHTML.split(" ").join("") === '2') {
            Utils.Exercise.toggleElementCorrectness(pairValues[6], true);
            $scope.sasScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairValues[6], false);
        }

        if(pairIDContainers[4].innerHTML.indexOf(2) !== -1) {
            Utils.Exercise.toggleElementCorrectness(pairIDContainers[4], true);
            $scope.sasScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairIDContainers[4], false);
        }

        if(pairIDContainers[5].innerHTML.indexOf(1) !== -1) {
            Utils.Exercise.toggleElementCorrectness(pairIDContainers[5], true);
            $scope.sasScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairIDContainers[5], false);
        }

        if(pairIDContainers[6].innerHTML.indexOf(3) !== -1) {
            Utils.Exercise.toggleElementCorrectness(pairIDContainers[6], true);
            $scope.sasScore++;
        } else {
            Utils.Exercise.toggleElementCorrectness(pairIDContainers[6], false);
        }

        if($scope.sasScore === SHUFFLE_AND_SORT_TOTAL_SCORE) {
            $scope.toggleCurrentExerciseCorrectness();
        }

        if($scope.mode === 'Practice') {
            $scope.currentScore = $scope.sasScore;
        } else {
            $scope.currentScore += $scope.sasScore;
            Utils.Exercise.togglePointerEvents(2, "none");
            Utils.Exercise.togglePointerEvents(3, "none");
        }
    };

    var checkReducerAnswers = function() {
        $scope.reducerScore = 0;

        var pairs = document.getElementsByClassName('jsav-pair');

        if($(pairs[4]).hasClass('jsav-pair-highlight')) {
            Utils.Exercise.toggleElementCorrectness(pairs[4], true);
            $scope.reducerScore++;
        }

        if($(pairs[5]).hasClass('jsav-pair-highlight')) {
            Utils.Exercise.toggleElementCorrectness(pairs[5], false);
        }

        if($(pairs[6]).hasClass('jsav-pair-highlight')) {
            Utils.Exercise.toggleElementCorrectness(pairs[6], true);
            $scope.reducerScore++;
        }

        if($(pairs[7]).hasClass('jsav-pair-highlight')) {
            Utils.Exercise.toggleElementCorrectness(pairs[7], true);
            $scope.reducerScore++;
        }

        if($(pairs[8]).hasClass('jsav-pair-highlight')) {
            Utils.Exercise.toggleElementCorrectness(pairs[8], true);
            $scope.reducerScore++;
        }

        if($(pairs[9]).hasClass('jsav-pair-highlight')) {
            Utils.Exercise.toggleElementCorrectness(pairs[9], false);
        }

        if($scope.reducerScore === REDUCER_TOTAL_SCORE) {
            $scope.toggleCurrentExerciseCorrectness();
        } else {
            for (var i = 0; i < pairs.length; i++) {
                if($(pairs[i]).hasClass(' incorrect')) {
                    $(pairs[i]).toggleClass('jsav-pair-highlight');
                }
            }
        }

        if($scope.mode === 'Practice') {
            $scope.currentScore = $scope.reducerScore;
        } else {
            $scope.currentScore += $scope.reducerScore;
            Utils.Exercise.togglePointerEvents(0, "none");
        }
    };
};