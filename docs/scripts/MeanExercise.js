/**
 * Created by matthewmicallef on 19/06/2016.
 */

var av,
    words = [],
    pairs = [],
    exercise,
    mapperJSAVArray,
    pair1,
    pair2,
    pair3,
    pair4,
    pair5,
    pair6;

var MeanExercise = {
    Mapper: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Mapper");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                MeanExercise.Mapper.modelSolution,
                MeanExercise.Mapper.initialize,
                {},
                {feedback: "atend"}
            );
            exercise.reset();
        },
        initialize: function() {
            if (mapperJSAVArray) {
                mapperJSAVArray.clear();
                pairs = [];
                pair1.clear();
                pair2.clear();
            }

            av.umsg("Consider the below list of key-value inputs to the Mapper." +
                "<br> Highlight the correct pairs below to reflect the Mapper's output.");

            words = ["K: hello V: 2", "K: world V: 1", "K: world V: 3"];
            mapperJSAVArray = av.ds.array(words);

            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(2, 1)');
            pair2 = Utils.JSAV.createKeyValuePair(av, '(hello, world)', '5, 1');
            pair3 = Utils.JSAV.createKeyValuePair(av, 'hello', '2, 3');
            pair4 = Utils.JSAV.createKeyValuePair(av, 'world', 'pair(1, 1)');
            pair5 = Utils.JSAV.createKeyValuePair(av, 'world', '(1, 1)');
            pair6 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(3, 1)');

            //Assigning click handlers
            pair1.click(Utils.Exercise.pairHighlightClickHandler);
            pair2.click(Utils.Exercise.pairHighlightClickHandler);
            pair3.click(Utils.Exercise.pairHighlightClickHandler);
            pair4.click(Utils.Exercise.pairHighlightClickHandler);
            pair5.click(Utils.Exercise.pairHighlightClickHandler);
            pair6.click(Utils.Exercise.pairHighlightClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);
            pairs.push(pair5);
            pairs.push(pair6);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            pair1 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', 'pair(2, 1)');
            pair2 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, world)', '5, 1');
            pair3 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '2, 3');
            pair4 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', 'pair(1, 1)');
            pair5 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '(1, 1)');
            pair6 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', 'pair(3, 1)');

            modeljsav.displayInit();

            pair1.highlight();
            modeljsav.umsg("Step 1: Highlight pair('world', 1)");
            modeljsav.step();

            pair4.highlight();
            modeljsav.umsg("Step 2: Highlight pair('hello', 1, 1)");
            modeljsav.step();

            pair6.highlight();
            modeljsav.umsg("Step 3: Highlight pair('hi', 1)");
            modeljsav.step();

            answerPairs.push(pair1);
            answerPairs.push(pair2);
            answerPairs.push(pair3);
            answerPairs.push(pair4);
            answerPairs.push(pair5);
            answerPairs.push(pair6);

            return answerPairs;
        }
    },
    Combiner: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Combiner");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                MeanExercise.Combiner.modelSolution,
                MeanExercise.Combiner.initialize,
                {},
                {feedback: "atend"}
            );
            exercise.reset();
        },
        initialize: function() {
            var label = document.getElementsByClassName('jsavlabel')[0];

            if(label) {
                pair1.clear();
                pair2.clear();
                pair3.clear();
                pair4.clear();
                pair5.clear();

                if(label) {
                    var canvas = document.getElementsByClassName('jsavcanvas')[0];
                    canvas.removeChild(label);
                }
            }

            av.umsg('The below 3 pairs are given as input to the Combiner. <br>' +
                'Fill in the values of the two resulting pairs. <br><br>' +
                'Inputs:');

            //Creating Input Pairs
            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(2, 1)');
            pair2 = Utils.JSAV.createKeyValuePair(av, 'world', 'pair(2, 1)');
            pair3 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(3, 1)');

            av.label('Outputs:');

            //Creating Output Pairs
            pair4 = Utils.JSAV.createKeyValuePair(av, 'hello', '-');
            pair5 = Utils.JSAV.createKeyValuePair(av, 'world', '-');

            //Assigning click handlers
            var pair4Values = $(pair4.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair5Values = $(pair5.element[0].getElementsByClassName('jsav-pair-values')[0]);

            pair4Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair5Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);
            pairs.push(pair5);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '-');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '-');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', 'pair(5, 2)');
            modeljsav.umsg('Step 1: Change value of first pair to (5, 2)');
            modeljsav.step();
            answerPairs.push(pair1);
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', 'pair(2, 1)');
            modeljsav.umsg('Step 2: Change value of second pair to (2, 1)');
            modeljsav.step();
            answerPairs.push(pair2);

            return answerPairs;
        }
    },
    ShuffleAndSort: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Shuffle and Sort");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                MeanExercise.ShuffleAndSort.modelSolution,
                MeanExercise.ShuffleAndSort.initialize,
                {},
                {feedback: "atend"}
            );
            exercise.reset();
        },
        initialize: function() {
            var label = document.getElementsByClassName('jsavlabel')[0];

            if(label) {
                pair1.clear();
                pair2.clear();
                pair3.clear();
                pair4.clear();
                pair5.clear();

                if(label) {
                    var canvas = document.getElementsByClassName('jsavcanvas')[0];
                    canvas.removeChild(label);
                }
            }

            av.umsg('Given the input set below being produced by two mappers, <br>' +
                'input the pair values as outputted by the shuffle and sort phase.<br>' +
                '<br> Input: ');

            //Creating Input Pairs - Mapper 1
            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(1, 1)');

            //Creating Input Pairs - Mapper 2
            pair2 = Utils.JSAV.createKeyValuePair(av, 'world', 'pair(1, 1)');
            pair3 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(2, 1)');

            //Adding ID Containers for Mapper ID
            pair1.addIDContainer("Mapper", '1');
            pair2.addIDContainer("Mapper", '2');
            pair3.addIDContainer("Mapper", '2');

            av.label('Outputs:');

            //Creating Output Pairs
            pair4 = Utils.JSAV.createKeyValuePair(av, 'hello', '-');
            pair5 = Utils.JSAV.createKeyValuePair(av, 'world', '-');

            //Get Pair Values Elements
            var pair4Values = $(pair4.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair5Values = $(pair5.element[0].getElementsByClassName('jsav-pair-values')[0]);

            //Assigning click handlers
            pair4Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair5Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);
            pairs.push(pair5);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            //Creating pairs.
            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '-');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '-');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', 'pair(1, 1), pair(2, 1)');
            modeljsav.umsg("Step 1: Change values of first pair to 'pair(1, 1), pair(2, 1)'.");
            modeljsav.step();
            answerPairs.push(pair1);
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', 'pair(1, 1)');
            modeljsav.umsg("Step 2: Change values of second pair to 'pair(1, 1)'.");
            modeljsav.step();
            answerPairs.push(pair2);

            return answerPairs;
        }
    },
    Reducer: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Reducer");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                MeanExercise.Reducer.modelSolution,
                MeanExercise.Reducer.initialize,
                {},
                {feedback: "atend"}
            );
            exercise.reset();
        },
        initialize: function() {
            var label = document.getElementsByClassName('jsavlabel')[0];

            if(label) {
                pair1.clear();
                pair2.clear();
                pair3.clear();
                pair4.clear();
                pair5.clear();
                pair6.clear();

                if(label) {
                    var canvas = document.getElementsByClassName('jsavcanvas')[0];
                    canvas.removeChild(label);
                }
            }

            av.umsg('The 2 pairs below are the input received by the Reducer. <br>' +
                'Choose the correct, final outputs. <br><br>' +
                'Inputs:');

            //Creating Pairs
            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', 'pair(3, 2), pair(3, 1)');
            pair2 = Utils.JSAV.createKeyValuePair(av, 'world', 'pair(1, 1), pair(2, 2)');

            av.label('Outputs:');

            //Creating Output Pair Choices
            pair3 = Utils.JSAV.createKeyValuePair(av, 'hello', '5/4 => 1.25');
            pair4 = Utils.JSAV.createKeyValuePair(av, 'world', '3/3 => 1.00');
            pair5 = Utils.JSAV.createKeyValuePair(av, 'hello', '6/3 => 2.00');
            pair6 = Utils.JSAV.createKeyValuePair(av, 'world', '2/4 => 0.50');

            //Assigning click handlers
            pair3.click(Utils.Exercise.pairHighlightClickHandler);
            pair4.click(Utils.Exercise.pairHighlightClickHandler);
            pair5.click(Utils.Exercise.pairHighlightClickHandler);
            pair6.click(Utils.Exercise.pairHighlightClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);
            pairs.push(pair5);
            pairs.push(pair6);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            //Creating Pairs
            pair1 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '5/4 => 1.25');
            pair2 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '3/3 => 1.00');
            pair3= Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '6/3 => 2.00');
            pair4 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '2/4 => 0.50');

            modeljsav.displayInit();

            pair2.highlight();
            modeljsav.umsg("Step 1: Highlight pair('world', '3/3 => 1.00')");
            modeljsav.step();

            pair3.highlight();
            modeljsav.umsg("Step 2: Highlight pair('hello', '6/3 => 2.00')");
            modeljsav.step();

            answerPairs.push(pair1);
            answerPairs.push(pair2);
            answerPairs.push(pair3);
            answerPairs.push(pair4);

            return answerPairs;
        }
    }
};