/**
 * Created by matthewmicallef on 28/06/2016.
 */

describe('MeanExerciseController', function() {

    var controller,
        scope;

    beforeEach(module('App'));
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('meanExerciseController', {
            $scope: scope
        });
    }));

    it('assigns a pageClass to the scope', function() {
        expect(scope.pageClass).toBe('page-exercises-mean');
    });

    it('assigns a currentExercise to the scope', function() {
        expect(scope.currentExercise).toBe('Mapper');
    });

    it('assigns a currentExerciseCorrect to the scope', function() {
        expect(scope.currentExerciseCorrect).toBeFalsy();
    });

    it('assigns a totalScore to the scope', function() {
        expect(scope.totalScore).toEqual(3);
    });

    it('assigns a currentScore to the scope', function() {
        expect(scope.currentScore).toEqual(0);
    });

    describe('checkAnswers', function() {
        var elemHighlight,
            elemNoHighlight,
            pairs;

        beforeEach(function() {
            elemHighlight = document.createElement('div');
            elemHighlight.className = 'jsav-pair jsav-pair-highlight incorrect';
            elemNoHighlight = document.createElement('div');
            elemNoHighlight.className = 'jsav-pair';
        });

        describe('if currentExercise is Mapper', function() {
            describe('if answers are not correct', function() {
                beforeEach(function() {
                    pairs = [
                        elemNoHighlight,
                        elemHighlight,
                        elemHighlight,
                        elemNoHighlight,
                        elemHighlight,
                        elemNoHighlight
                    ];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });

            describe('if answers are correct', function() {
                beforeEach(function() {
                    pairs = [
                        elemHighlight,
                        elemNoHighlight,
                        elemNoHighlight,
                        elemHighlight,
                        elemNoHighlight,
                        elemHighlight
                    ];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });
        });

        describe('if currentExercise is Combiner', function() {
            beforeEach(function() {
                scope.currentExercise = 'Combiner';
            });

            describe('if answers are not correct', function() {
                beforeEach(function() {
                    var elem = document.createElement('div');
                    elem.className = 'jsav-pair-values';

                    pairs = [elem, elem, elem, elem, elem];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });

            describe('if answers are correct', function() {
                beforeEach(function() {
                    var elem1 = document.createElement('div');
                    elem1.className = 'jsav-pair-values';
                    elem1.innerHTML = 'pair(5, 2)';

                    var elem2 = document.createElement('div');
                    elem2.className = 'jsav-pair-values';
                    elem2.innerHTML = 'pair(2, 1)';

                    pairs = [null, null, null, elem1, elem2];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });
        });

        describe('if currentExercise is ShuffleAndSort', function() {
            beforeEach(function() {
                scope.currentExercise = 'ShuffleAndSort';
            });

            describe('if answers are not correct', function() {
                beforeEach(function() {
                    var elem = document.createElement('div');
                    elem.className = 'jsav-pair-values';

                    pairs = [elem, elem, elem, elem, elem];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });

            describe('if answers are correct', function() {
                beforeEach(function() {
                    var elem1 = document.createElement('div');
                    elem1.className = 'jsav-pair-values';
                    elem1.innerHTML = 'pair(1, 1), pair(2, 1)';

                    var elem2 = document.createElement('div');
                    elem2.className = 'jsav-pair-values';
                    elem2.innerHTML = 'pair(1, 1)';

                    pairs = [null, null, null, elem1, elem2];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });
        });

        describe('if currentExercise is Reducer', function() {
            beforeEach(function() {
                scope.currentExercise = 'Reducer';
            });

            describe('if answers are not correct', function() {
                beforeEach(function() {
                    pairs = [
                        elemHighlight,
                        elemHighlight,
                        elemHighlight,
                        elemNoHighlight,
                        elemNoHighlight,
                        elemHighlight
                    ];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });

            describe('if answers are correct', function() {
                beforeEach(function() {
                    pairs = [
                        elemNoHighlight,
                        elemNoHighlight,
                        elemNoHighlight,
                        elemHighlight,
                        elemHighlight,
                        elemNoHighlight
                    ];

                    spyOn(document, 'getElementsByClassName').and.returnValue(pairs);
                    spyOn(Utils.Exercise, 'toggleElementCorrectness');
                });

                it('should not throw an error', function() {
                    expect(scope.checkAnswers).not.toThrowError();
                });
            });
        });
    });

    describe('loadNextExercise', function() {
        describe('if currentExercise is equal to Mapper', function() {
            beforeEach(function() {
                scope.loadNextExercise();
            });

            it('should set currentExercise to Combiner', function() {
                expect(scope.currentExercise).toBe('Combiner');
            });

            it('should set currentExerciseCorrect to false', function() {
                expect(scope.currentExerciseCorrect).toBeFalsy();
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });

        describe('if currentExercise is equal to Combiner', function() {
            beforeEach(function() {
                scope.currentExercise = 'Combiner';
                scope.loadNextExercise();
            });

            it('should set currentExercise to ShuffleAndSort', function() {
                expect(scope.currentExercise).toBe('ShuffleAndSort');
            });

            it('should set currentExerciseCorrect to false', function() {
                expect(scope.currentExerciseCorrect).toBeFalsy();
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });

        describe('if currentExercise is equal to ShuffleAndSort', function() {
            beforeEach(function() {
                scope.currentExercise = 'ShuffleAndSort';
                scope.loadNextExercise();
            });

            it('should set currentExercise to Reducer', function() {
                expect(scope.currentExercise).toBe('Reducer');
            });

            it('should set currentExerciseCorrect to false', function() {
                expect(scope.currentExerciseCorrect).toBeFalsy();
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });
    });

    describe('toggleCurrentExerciseCorrectness', function() {
        it('should toggle the value of currentExerciseCorrect', function() {
            scope.toggleCurrentExerciseCorrectness();
            expect(scope.currentExerciseCorrect).toBeTruthy();
        });
    });

    describe('loadExercise', function() {
        describe('if exerciseName is set to Mapper', function() {
            beforeEach(function() {
                scope.loadExercise('Mapper');
            });

            it('should set the total score to 3', function() {
                expect(scope.totalScore).toEqual(3);
            });

            it('should set currentExercise to Mapper', function() {
                expect(scope.currentExercise).toBe('Mapper');
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });

        describe('if exerciseName is set to Combiner', function() {
            beforeEach(function() {
                scope.loadExercise('Combiner');
            });

            it('should set the total score to 2', function() {
                expect(scope.totalScore).toEqual(2);
            });

            it('should set currentExercise to Combiner', function() {
                expect(scope.currentExercise).toBe('Combiner');
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });

        describe('if exerciseName is set to ShuffleAndSort', function() {
            beforeEach(function() {
                scope.loadExercise('ShuffleAndSort');
            });

            it('should set the total score to 2', function() {
                expect(scope.totalScore).toEqual(2);
            });

            it('should set currentExercise to ShuffleAndSort', function() {
                expect(scope.currentExercise).toBe('ShuffleAndSort');
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });

        describe('if exerciseName is set to Reducer', function() {
            beforeEach(function() {
                scope.loadExercise('Reducer');
            });

            it('should set the total score to 2', function() {
                expect(scope.totalScore).toEqual(2);
            });

            it('should set currentExercise to Reducer', function() {
                expect(scope.currentExercise).toBe('Reducer');
            });

            it('should set currentScore to 0', function() {
                expect(scope.currentScore).toEqual(0);
            });
        });
    });
});