/**
 * Created by matthewmicallef on 28/06/2016.
 */

/*
 Note: The content of the exercises is subject to change,
 so this test does not check the actual content but the default calls for the exercises.
 */

describe('RelativeFrequenciesExercise', function() {
    var modeljsav, result;

    beforeEach(function() {
        modeljsav = {
            displayInit: function() { },
            umsg: function() { },
            step: function() { }
        };

        var pair = {
            highlight: function() { },
            addIDContainer: function() { },
            element: [
                {
                    getElementsByClassName: function() {
                        return [];
                    }
                }
            ]
        };

        spyOn(Utils.JSAV, 'createKeyValuePair').and.returnValue(pair);
        spyOn(Utils.Exercise, 'changeField').and.returnValue(pair);
        spyOn(modeljsav, 'displayInit');
    });

    describe('Mapper', function() {
        describe('modelSolution', function() {
            it('should return an array of 4 answer pairs', function() {
                result = RelativeFrequenciesExercise.Mapper.modelSolution(modeljsav);
                expect(result.length).toEqual(4);
            });
        });
    });

    describe('Combiner', function() {
        describe('modelSolution', function() {
            it('should return an array of 2 answer pairs', function() {
                result = RelativeFrequenciesExercise.Combiner.modelSolution(modeljsav);
                expect(result.length).toEqual(2);
            });
        });
    });

    describe('ShuffleAndSort', function() {
        describe('modelSolution', function() {
            it('should return an array of 3 answer pairs', function() {
                result = RelativeFrequenciesExercise.ShuffleAndSort.modelSolution(modeljsav);
                expect(result.length).toEqual(3);
            });
        });
    });

    describe('Reducer', function() {
        describe('modelSolution', function() {
            it('should return an array of 6 answer pairs', function() {
                result = RelativeFrequenciesExercise.Reducer.modelSolution(modeljsav);
                expect(result.length).toEqual(6);
            });
        });
    });
});