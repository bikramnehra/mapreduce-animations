/**
 * Created by matthewmicallef on 28/06/2016.
 */

describe('RelativeFrequenciesExerciseController', function() {

    var controller,
        scope;

    beforeEach(module('App'));
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('relativeFrequenciesExerciseController', {
            $scope: scope
        });
    }));

    it('assigns a pageClass to the scope', function() {
        expect(scope.pageClass).toBe('page-exercises-relativefrequencies');
    });

    it('assigns a currentExercise to the scope', function() {
        expect(scope.currentExercise).toBe('Mapper');
    });

    it('assigns a currentExerciseCorrect to the scope', function() {
        expect(scope.currentExerciseCorrect).toBeFalsy();
    });

    it('assigns a totalScore to the scope', function() {
        expect(scope.totalScore).toEqual(4);
    });

    it('assigns a currentScore to the scope', function() {
        expect(scope.currentScore).toEqual(0);
    });

    describe('checkAnswers', function() {
        var pairs;

        describe('if currentExercise is Mapper', function() {
            describe('if answers are not correct', function() {
                beforeEach(function() {
                    var elem = document.createElement('div');
                    elem.className = 'jsav-pair-key';

                    pairs = [elem, elem, elem, elem];

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
                    elem1.className = 'jsav-pair-key';
                    elem1.innerHTML = '(hello, *)';

                    var elem2 = document.createElement('div');
                    elem2.className = 'jsav-pair-key';
                    elem2.innerHTML = '(hello, world)';

                    var elem3 = document.createElement('div');
                    elem3.className = 'jsav-pair-key';
                    elem3.innerHTML = '(world, *)';

                    var elem4 = document.createElement('div');
                    elem4.className = 'jsav-pair-key';
                    elem4.innerHTML = '(world, hello)';

                    pairs = [elem1, elem2, elem3, elem4];

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
                    elem.className = 'jsav-pair-key jsav-pair-values';

                    pairs = [null, null, null, null, elem, elem];

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
                    elem1.className = 'jsav-pair-key';
                    elem1.innerHTML = '(hello, *)';

                    var elem2 = document.createElement('div');
                    elem2.className = 'jsav-pair-key';
                    elem2.innerHTML = '(hello, hello)';

                    var elemID1 = document.createElement('div');
                    elemID1.className = 'jsav-pair-values';
                    elemID1.innerHTML = '2';

                    var elemID2 = document.createElement('div');
                    elemID2.className = 'jsav-pair-values';
                    elemID2.innerHTML = '2';

                    pairs = [null, null, null, null, elem1, elem2];
                    var ids = [null, null, null, null, elemID1, elemID2];

                    spyOn(document, 'getElementsByClassName').and.returnValues(pairs, ids);
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
                    elem.className = 'jsav-pair-values idContainer';

                    pairs = [elem, elem, elem, elem, elem, elem, elem];

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
                    elem1.innerHTML = '1';

                    var elem2 = document.createElement('div');
                    elem2.className = 'jsav-pair-values';
                    elem2.innerHTML = '2, 3';

                    var elem3 = document.createElement('div');
                    elem3.className = 'jsav-pair-values';
                    elem3.innerHTML = '2';

                    var elemID1 = document.createElement('div');
                    elemID1.className = 'idContainer';
                    elemID1.innerHTML = '2';

                    var elemID2 = document.createElement('div');
                    elemID2.className = 'idContainer';
                    elemID2.innerHTML = '1';

                    var elemID3 = document.createElement('div');
                    elemID3.className = 'idContainer';
                    elemID3.innerHTML = '3';

                    pairs = [null, null, null, null, elem1, elem2, elem3];
                    var ids = [null, null, null, null, elemID1, elemID2, elemID3];

                    spyOn(document, 'getElementsByClassName').and.returnValues(pairs, ids);
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
                    var elemHighlight = document.createElement('div');
                    elemHighlight.className = 'jsav-pair jsav-pair-highlight incorrect';
                    var elemNoHighlight = document.createElement('div');
                    elemNoHighlight.className = 'jsav-pair';

                    pairs = [
                        elemNoHighlight,
                        elemHighlight,
                        elemNoHighlight,
                        elemNoHighlight,
                        elemNoHighlight,
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
                    var elemHighlight = document.createElement('div');
                    elemHighlight.className = 'jsav-pair jsav-pair-highlight';

                    var elemNoHighlight = document.createElement('div');
                    elemNoHighlight.className = 'jsav-pair';

                    pairs = [
                        null,
                        null,
                        null,
                        null,
                        elemHighlight,
                        elemHighlight,
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

            it('should set the total score to 4', function() {
                expect(scope.totalScore).toEqual(4);
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

            it('should set the total score to 4', function() {
                expect(scope.totalScore).toEqual(4);
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

            it('should set the total score to 6', function() {
                expect(scope.totalScore).toEqual(6);
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

            it('should set the total score to 4', function() {
                expect(scope.totalScore).toEqual(4);
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