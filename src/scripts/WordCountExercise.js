/**
 * Created by matthewmicallef on 09/06/2016.
 */

var av,
    words = [],
    pairs = [],
    exercise,
    mapperJSAVArray,
    combinerJSAVArray,
    pair1,
    pair2,
    pair3,
    pair4,
    pair5,
    pair6,
    pair7;

var WordCountExercise = {
    Mapper: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Mapper");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                WordCountExercise.Mapper.modelSolution,
                WordCountExercise.Mapper.initialize,
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

            av.umsg("Consider the below list of words as input to the Mapper." +
                "<br> Click on the empty pairs below and change their values accordingly, to reflect those created by the mapper.");

            words = ["hello", "world"];
            mapperJSAVArray = av.ds.array(words);

            //Creating Output Pairs
            pair1 = Utils.JSAV.createKeyValuePair(av, '-', '-');
            pair2 = Utils.JSAV.createKeyValuePair(av, '-', '-');

            //Getting Pair Key Elements
            var pair1Key = $(pair1.element[0].getElementsByClassName('jsav-pair-key')[0]);
            var pair2Key = $(pair2.element[0].getElementsByClassName('jsav-pair-key')[0]);

            //Getting Pair Values Elements
            var pair1Values = $(pair1.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair2Values = $(pair2.element[0].getElementsByClassName('jsav-pair-values')[0]);

            pair1Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);
            pair2Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);

            pair1Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair2Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '-');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '-');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', 'hello');
            modeljsav.umsg('Step 1: Change key of first pair to hello');
            modeljsav.step();
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '1');
            modeljsav.umsg('Step 2: Change value of first pair to 1');
            modeljsav.step();
            answerPairs.push(pair1);

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', 'world');
            modeljsav.umsg('Step 3: Change key of second pair to world');
            modeljsav.step();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '1');
            modeljsav.umsg('Step 4: Change value of second pair to 1');
            modeljsav.step();
            answerPairs.push(pair2);

            return answerPairs;
        }
    },
    Combiner: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Combiner");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                WordCountExercise.Combiner.modelSolution,
                WordCountExercise.Combiner.initialize,
                {},
                {feedback: "atend"}
            );
            exercise.reset();
        },
        initialize: function() {
            if(combinerJSAVArray) {
                combinerJSAVArray.clear();
                pairs = [];
                pair1.clear();
                pair2.clear();
                pair3.clear();
                pair4.clear();
                pair5.clear();
                pair6.clear();
                pair7.clear();
            }

            av.umsg('Considering the below list of words as the input set, while using 1 mapper. <br>' +
                'Highlight the correct outputs below, produced by the Combiner.');

            words = ["hello", "world", "hi", "hello"];
            combinerJSAVArray = av.ds.array(words);

            //Creating Pair Choices
            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', '2');
            pair2 = Utils.JSAV.createKeyValuePair(av, 'world', '1');
            pair3 = Utils.JSAV.createKeyValuePair(av, 'hello', '1, 1');
            pair4 = Utils.JSAV.createKeyValuePair(av, 'hi', '1, 1');
            pair5 = Utils.JSAV.createKeyValuePair(av, 'world, hi', '2');
            pair6 = Utils.JSAV.createKeyValuePair(av, 'hi, world', '1, 1');
            pair7 = Utils.JSAV.createKeyValuePair(av, 'hi', '1');

            //Assigning click handlers
            pair1.click(Utils.Exercise.pairHighlightClickHandler);
            pair2.click(Utils.Exercise.pairHighlightClickHandler);
            pair3.click(Utils.Exercise.pairHighlightClickHandler);
            pair4.click(Utils.Exercise.pairHighlightClickHandler);
            pair5.click(Utils.Exercise.pairHighlightClickHandler);
            pair6.click(Utils.Exercise.pairHighlightClickHandler);
            pair7.click(Utils.Exercise.pairHighlightClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);
            pairs.push(pair5);
            pairs.push(pair6);
            pairs.push(pair7);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '2');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '1');
            var pair3 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '1, 1');
            var pair4 = Utils.JSAV.createKeyValuePair(modeljsav, 'hi', '1, 1');
            var pair5 = Utils.JSAV.createKeyValuePair(modeljsav, 'world, hi', '2');
            var pair6 = Utils.JSAV.createKeyValuePair(modeljsav, 'hi, world', '1, 1');
            var pair7 = Utils.JSAV.createKeyValuePair(modeljsav, 'hi', '1');

            pair1.highlight();
            modeljsav.umsg("Step 1: Highlight pair('world', 1)");
            modeljsav.displayInit();

            pair2.highlight();
            modeljsav.umsg("Step 2: Highlight pair('hello', 1, 1)");
            modeljsav.step();

            pair7.highlight();
            modeljsav.umsg("Step 3: Highlight pair('hi', 1)");
            modeljsav.step();

            answerPairs.push(pair1);
            answerPairs.push(pair2);
            answerPairs.push(pair3);
            answerPairs.push(pair4);
            answerPairs.push(pair5);
            answerPairs.push(pair6);
            answerPairs.push(pair7);

            return answerPairs;
        }
    },
    ShuffleAndSort: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Shuffle and Sort");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                WordCountExercise.ShuffleAndSort.modelSolution,
                WordCountExercise.ShuffleAndSort.initialize,
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

            av.umsg('Assume that the input set is coming from two mappers as shown below. <br>' +
                'Specify the pair values as produced by the shuffle and sort phase.<br>' +
                '<br> Input: ');

            //Creating Input Pairs - Mapper 1
            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', '1');
            pair2 = Utils.JSAV.createKeyValuePair(av, 'world', '1');

            //Creating Input Pairs - Mapper 2
            pair3 = Utils.JSAV.createKeyValuePair(av, 'hello', '2');

            //Adding ID Containers for Mapper ID
            pair1.addIDContainer("Mapper", '1');
            pair2.addIDContainer("Mapper", '1');
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

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '1, 2');
            modeljsav.umsg("Step 1: Change values of first pair to '1, 2'.");
            modeljsav.step();
            answerPairs.push(pair1);
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '1');
            modeljsav.umsg('Step 2: Change values of second pair to 1.');
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
                WordCountExercise.Reducer.modelSolution,
                WordCountExercise.Reducer.initialize,
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

            av.umsg('The below 3 pairs are given as input to the Reducer. <br>' +
                'Fill in the values of the other 3 empty pairs with the output value of the Reducer. <br><br>' +
                'Inputs:');

            //Creating Pairs
            pair1 = Utils.JSAV.createKeyValuePair(av, 'hello', '1, 1, 1');
            pair2 = Utils.JSAV.createKeyValuePair(av, 'world', '1');
            pair3 = Utils.JSAV.createKeyValuePair(av, 'how', '1, 1');

            av.label('Outputs:');

            pair4 = Utils.JSAV.createKeyValuePair(av, 'hello', '-');
            pair5 = Utils.JSAV.createKeyValuePair(av, 'world', '-');
            pair6 = Utils.JSAV.createKeyValuePair(av, 'how', '-');

            //Assigning click handlers
            var pair4Values = $(pair4.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair5Values = $(pair5.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair6Values = $(pair6.element[0].getElementsByClassName('jsav-pair-values')[0]);

            pair4Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair5Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair6Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);

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

            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, 'hello', '-');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, 'world', '-');
            var pair3 = Utils.JSAV.createKeyValuePair(modeljsav, 'how', '-');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '3');
            modeljsav.umsg('Step 1: Change value of first pair to 3');
            modeljsav.step();
            answerPairs.push(pair1);
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '1');
            modeljsav.umsg('Step 2: Change value of second pair to 1');
            modeljsav.step();
            answerPairs.push(pair2);

            Utils.Exercise.changeField(pair3.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '2');
            modeljsav.umsg('Step 3: Change value of third pair to 2');
            modeljsav.step();
            answerPairs.push(pair3);

            return answerPairs;
        }
    }
};