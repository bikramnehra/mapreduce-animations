/**
 * Created by matthewmicallef on 26/06/2016.
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
    pair6,
    pair7,
    pair8,
    pair9,
    pair10;

var RelativeFrequenciesExercise = {
    Mapper: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Mapper");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                RelativeFrequenciesExercise.Mapper.modelSolution,
                RelativeFrequenciesExercise.Mapper.initialize,
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
                pair3.clear();
                pair4.clear();
            }

            av.umsg("The below array shows the input given to the RF Mapper." +
                "<br> Fill in the correct key inputs as produced by the same Mapper.");

            words = ["hello", "world"];
            mapperJSAVArray = av.ds.array(words);

            pair1 = Utils.JSAV.createKeyValuePair(av, '-', '1');
            pair2 = Utils.JSAV.createKeyValuePair(av, '-', '1');
            pair3 = Utils.JSAV.createKeyValuePair(av, '-', '1');
            pair4 = Utils.JSAV.createKeyValuePair(av, '-', '1');

            //Getting Pair Key Elements
            var pair1Key = $(pair1.element[0].getElementsByClassName('jsav-pair-key')[0]);
            var pair2Key = $(pair2.element[0].getElementsByClassName('jsav-pair-key')[0]);
            var pair3Key = $(pair3.element[0].getElementsByClassName('jsav-pair-key')[0]);
            var pair4Key = $(pair4.element[0].getElementsByClassName('jsav-pair-key')[0]);

            pair1Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);
            pair2Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);
            pair3Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);
            pair4Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '1');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '1');
            var pair3 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '1');
            var pair4 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '1');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', '(hello, *)');
            modeljsav.umsg('Step 1: Change key of first pair to (hello, *)');
            modeljsav.step();
            answerPairs.push(pair1);
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', '(hello, world)');
            modeljsav.umsg('Step 2: Change key of second pair to (hello, world)');
            modeljsav.step();
            answerPairs.push(pair2);

            Utils.Exercise.changeField(pair3.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', '(world, *)');
            modeljsav.umsg('Step 3: Change key of third pair to (world, *)');
            modeljsav.step();
            answerPairs.push(pair3);

            Utils.Exercise.changeField(pair4.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', '(world, hello)');
            modeljsav.umsg('Step 4: Change key of fourth pair to (world, hello)');
            modeljsav.step();
            answerPairs.push(pair4);

            return answerPairs;
        }
    },
    Combiner: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Combiner");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                RelativeFrequenciesExercise.Combiner.modelSolution,
                RelativeFrequenciesExercise.Combiner.initialize,
                {},
                {feedback: "atend"}
            );
            exercise.reset();
        },
        initialize: function() {
            var label = document.getElementsByClassName('jsavlabel')[0];

            if(combinerJSAVArray) {
                combinerJSAVArray.clear();
                pairs = [];
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

            av.umsg('The below 4 pairs are given as input to the Combiner. <br>' +
                'Fill in the values of the two resulting pairs. <br><br>' +
                'Inputs:');

            //Creating Input Pairs
            pair1 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', '1');
            pair2 = Utils.JSAV.createKeyValuePair(av, '(hello, hello)', '1');
            pair3 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', '1');
            pair4 = Utils.JSAV.createKeyValuePair(av, '(hello, hello)', '1');

            av.label('Outputs:');

            //Creating Output Pairs
            pair5 = Utils.JSAV.createKeyValuePair(av, '-', '-');
            pair6 = Utils.JSAV.createKeyValuePair(av, '-', '-');

            //Getting Pair Key Elements
            var pair5Key = $(pair5.element[0].getElementsByClassName('jsav-pair-key')[0]);
            var pair6Key = $(pair6.element[0].getElementsByClassName('jsav-pair-key')[0]);

            //Getting Pair Values Elements
            var pair5Values = $(pair5.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair6Values = $(pair6.element[0].getElementsByClassName('jsav-pair-values')[0]);

            pair5Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);
            pair6Key.click({type: 'key'}, Utils.Exercise.pairClickHandler);

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

            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '-');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, '-', '-');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', '(hello, *)');
            modeljsav.umsg('Step 1: Change key of first pair to (hello, *)');
            modeljsav.step();
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '2');
            modeljsav.umsg('Step 2: Change value of first pair to 2');
            modeljsav.step();
            answerPairs.push(pair1);

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-key')[0], 'pair', '(hello, hello)');
            modeljsav.umsg('Step 3: Change key of second pair to (hello, hello)');
            modeljsav.step();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '2');
            modeljsav.umsg('Step 4: Change value of second pair to 2');
            modeljsav.step();
            answerPairs.push(pair2);

            return answerPairs;
        }
    },
    ShuffleAndSort: {
        run: function() {
            Utils.JSAV.createExerciseContainer("ShuffleAndSort");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                RelativeFrequenciesExercise.ShuffleAndSort.modelSolution,
                RelativeFrequenciesExercise.ShuffleAndSort.initialize,
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
                pair7.clear();

                if(label) {
                    var canvas = document.getElementsByClassName('jsavcanvas')[0];
                    canvas.removeChild(label);
                }
            }

            av.umsg('Assume that the input set is coming from two mappers as shown below. <br>' +
                'Specify the Sort ID and the pair values as produced by the shuffle and sort phase.<br>' +
                '<br> Input: ');

            //Creating Input Pairs - Mapper 1
            pair1 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', '2');
            pair2 = Utils.JSAV.createKeyValuePair(av, '(hello, hello)', '1');

            //Creating Input Pairs - Mapper 2
            pair3 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', '3');
            pair4 = Utils.JSAV.createKeyValuePair(av, '(hello, world)', '2');

            //Adding ID Containers for Mapper ID
            pair1.addIDContainer("Mapper", '1');
            pair2.addIDContainer("Mapper", '1');
            pair3.addIDContainer("Mapper", '2');
            pair4.addIDContainer("Mapper", '2');

            av.label('Outputs:');

            //Creating Output Pairs
            pair5 = Utils.JSAV.createKeyValuePair(av, '(hello, hello)', '-');
            pair6 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', '-');
            pair7 = Utils.JSAV.createKeyValuePair(av, '(hello, world)', '-');

            //Getting Pair Values Elements
            var pair5Values = $(pair5.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair6Values = $(pair6.element[0].getElementsByClassName('jsav-pair-values')[0]);
            var pair7Values = $(pair7.element[0].getElementsByClassName('jsav-pair-values')[0]);

            //Assigning click handlers
            pair5Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair6Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);
            pair7Values.click({type: 'values'}, Utils.Exercise.pairClickHandler);

            //Adding ID Containers for Mapper ID
            pair5.addIDContainer("Sort", '-');
            pair6.addIDContainer("Sort", '-');
            pair7.addIDContainer("Sort", '-');

            //Getting ID Elements
            var pair5SortID = $(pair5.element[0].getElementsByClassName('idContainer')[0]);
            var pair6SortID = $(pair6.element[0].getElementsByClassName('idContainer')[0]);
            var pair7SortID = $(pair7.element[0].getElementsByClassName('idContainer')[0]);

            //Assigning click handlers
            pair5SortID.click({type: 'id'}, Utils.Exercise.pairClickHandler);
            pair6SortID.click({type: 'id'}, Utils.Exercise.pairClickHandler);
            pair7SortID.click({type: 'id'}, Utils.Exercise.pairClickHandler);

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

            //Creating pairs.
            var pair1 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, hello)', '-');
            var pair2 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, *)', '-');
            var pair3 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, world)', '-');

            //Adding ID Containers for Sort ID
            pair1.addIDContainer("Sort", '-');
            pair2.addIDContainer("Sort", '-');
            pair3.addIDContainer("Sort", '-');

            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '1');
            Utils.Exercise.changeField(pair1.element[0].getElementsByClassName('SortId')[0], 'ID', '2');
            modeljsav.umsg('Step 1: Change values of first pair to 3.');
            modeljsav.step();
            answerPairs.push(pair1);
            modeljsav.displayInit();

            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '2, 3');
            Utils.Exercise.changeField(pair2.element[0].getElementsByClassName('SortId')[0], 'ID', '1');
            modeljsav.umsg('Step 2: Change values of second pair to 2, 3.');
            modeljsav.step();
            answerPairs.push(pair2);

            Utils.Exercise.changeField(pair3.element[0].getElementsByClassName('jsav-pair-values')[0], 'pair', '2');
            Utils.Exercise.changeField(pair3.element[0].getElementsByClassName('SortId')[0], 'ID', '3');
            modeljsav.umsg('Step 3: Change values of second pair to 2.');
            modeljsav.step();
            answerPairs.push(pair3);

            return answerPairs;
        }
    },
    Reducer: {
        run: function() {
            Utils.JSAV.createExerciseContainer("Reducer");
            av = new JSAV("mapReduceExercise");
            av.recorded();

            exercise = av.exercise(
                RelativeFrequenciesExercise.Reducer.modelSolution,
                RelativeFrequenciesExercise.Reducer.initialize,
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
                pair7.clear();
                pair8.clear();
                pair9.clear();
                pair10.clear();

                if(label) {
                    var canvas = document.getElementsByClassName('jsavcanvas')[0];
                    canvas.removeChild(label);
                }
            }

            av.umsg('The 4 pairs below are the input received by the Reducer. <br>' +
                'Choose the correct, final outputs. <br><br>' +
                'Inputs:');

            //Creating Pairs
            pair1 = Utils.JSAV.createKeyValuePair(av, '(are, *)', '1, 1, 1, 1');
            pair2 = Utils.JSAV.createKeyValuePair(av, '(are, world)', '1, 1');
            pair3 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', '1, 1, 1');
            pair4 = Utils.JSAV.createKeyValuePair(av, '(hello, you)', '1');

            av.label('Outputs:');

            //Creating Output Pair Choices
            pair5 = Utils.JSAV.createKeyValuePair(av, '(are, *)', 'Marginal: 4');
            pair6 = Utils.JSAV.createKeyValuePair(av, '(are, world)', '1/4 => 0.25');
            pair7 = Utils.JSAV.createKeyValuePair(av, '(are, world)', '2/4 => 0.50');
            pair8 = Utils.JSAV.createKeyValuePair(av, '(hello, *)', 'Marginal: 3');
            pair9 = Utils.JSAV.createKeyValuePair(av, '(hello, you)', '1/3 => 0.33');
            pair10 = Utils.JSAV.createKeyValuePair(av, '(hello, are)', '2/6 => 0.33');

            //Assigning click handlers
            pair5.click(Utils.Exercise.pairHighlightClickHandler);
            pair6.click(Utils.Exercise.pairHighlightClickHandler);
            pair7.click(Utils.Exercise.pairHighlightClickHandler);
            pair8.click(Utils.Exercise.pairHighlightClickHandler);
            pair9.click(Utils.Exercise.pairHighlightClickHandler);
            pair10.click(Utils.Exercise.pairHighlightClickHandler);

            pairs.push(pair1);
            pairs.push(pair2);
            pairs.push(pair3);
            pairs.push(pair4);
            pairs.push(pair5);
            pairs.push(pair6);
            pairs.push(pair7);
            pairs.push(pair8);
            pairs.push(pair9);
            pairs.push(pair10);

            return pairs;
        },
        modelSolution: function(modeljsav) {
            var answerPairs = [];

            pair1 = Utils.JSAV.createKeyValuePair(modeljsav, '(are, *)', 'Marginal: 4');
            pair2 = Utils.JSAV.createKeyValuePair(modeljsav, '(are, world)', '1/4 => 0.25');
            pair3 = Utils.JSAV.createKeyValuePair(modeljsav, '(are, world)', '2/4 => 0.50');
            pair4 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, *)', 'Marginal: 3');
            pair5 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, you)', '1/3 => 0.33');
            pair6 = Utils.JSAV.createKeyValuePair(modeljsav, '(hello, are)', '2/6 => 0.33');

            modeljsav.displayInit();

            pair1.highlight();
            modeljsav.umsg("Step 1: Highlight pair '(are, *), Marginal: 4'");
            modeljsav.step();

            pair3.highlight();
            modeljsav.umsg("Step 2: Highlight pair '(are, world), 2/4 => 0.50'");
            modeljsav.step();

            pair4.highlight();
            modeljsav.umsg("Step 3: Highlight pair '(hello, *), Marginal: 3'");
            modeljsav.step();

            pair5.highlight();
            modeljsav.umsg("Step 3: Highlight pair '(hello, you), 1/3 => 0.33'");
            modeljsav.step();

            answerPairs.push(pair1);
            answerPairs.push(pair2);
            answerPairs.push(pair3);
            answerPairs.push(pair4);
            answerPairs.push(pair5);
            answerPairs.push(pair6);

            return answerPairs;
        }
    }
};