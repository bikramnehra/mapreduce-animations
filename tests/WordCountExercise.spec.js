/**
 * Created by matthewmicallef on 28/06/2016.
 */

describe('WordCountExercise', function() {
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
            it('should return an array of 2 answer pairs', function() {
                result = WordCountExercise.Mapper.modelSolution(modeljsav);
                expect(result.length).toEqual(2);
            });
        });
    });

    describe('Combiner', function() {
        describe('modelSolution', function() {
            it('should return an array of 7 answer pairs', function() {
                result = WordCountExercise.Combiner.modelSolution(modeljsav);
                expect(result.length).toEqual(7);
            });
        });
    });

    describe('ShuffleAndSort', function() {
        describe('modelSolution', function() {
            it('should return an array of 2 answer pairs', function() {
                result = WordCountExercise.ShuffleAndSort.modelSolution(modeljsav);
                expect(result.length).toEqual(2);
            });
        });
    });

    describe('Reducer', function() {
        describe('modelSolution', function() {
            it('should return an array of 3 answer pairs', function() {
                result = WordCountExercise.Reducer.modelSolution(modeljsav);
                expect(result.length).toEqual(3);
            });
        });
    });
});