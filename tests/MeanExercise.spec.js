/**
 * Created by matthewmicallef on 28/06/2016.
 */

/*
    Note: The content of the exercises is subject to change,
    so this test does not check the actual content but the default calls for the exercises.
 */

describe('MeanExercise', function() {
    var modeljsav, result;

    beforeEach(function() {
        modeljsav = {
            displayInit: function() { },
            umsg: function() { },
            step: function() { }
        };

        var pair = {
            highlight: function() { },
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
            it('should return an array of 6 answer pairs', function() {
                result = MeanExercise.Mapper.modelSolution(modeljsav);
                expect(result.length).toEqual(6);
            });
        });
    });

    describe('Combiner', function() {
        describe('modelSolution', function() {
            it('should return an array of 2 answer pairs', function() {
                result = MeanExercise.Combiner.modelSolution(modeljsav);
                expect(result.length).toEqual(2);
            });
        });
    });

    describe('ShuffleAndSort', function() {
        describe('modelSolution', function() {
            it('should return an array of 2 answer pairs', function() {
                result = MeanExercise.ShuffleAndSort.modelSolution(modeljsav);
                expect(result.length).toEqual(2);
            });
        });
    });

    describe('Reducer', function() {
        describe('modelSolution', function() {
            it('should return an array of 4 answer pairs', function() {
                result = MeanExercise.Reducer.modelSolution(modeljsav);
                expect(result.length).toEqual(4);
            });
        });
    });
});