/**
 * Created by matthewmicallef on 28/06/2016.
 */

describe('MapReduceExerciseController', function() {

    var controller,
        scope,
        $timeout;

    beforeEach(module('App'));
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        createController = function(name, type) {
            scope.name = name;
            scope.type = type;
            scope.$digest();

            return $controller('mapReduceExerciseController', {
                $scope: scope
            });
        };
    }));

    describe('if name equals WordCount', function() {
        beforeEach(inject(function (_$timeout_) {
            $timeout = _$timeout_;
        }));

        describe('if type equals Mapper', function() {
            beforeEach(function () {
                controller = createController("WordCount", "Mapper");

                WordCountExercise.Mapper = {
                    run: function() { }
                };
                spyOn(WordCountExercise.Mapper, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCountExercise.Mapper.run', function() {
                expect(WordCountExercise.Mapper.run).toHaveBeenCalled();
            });
        });

        describe('if type equals Combiner', function() {
            beforeEach(function () {
                controller = createController("WordCount", "Combiner");

                WordCountExercise.Combiner = {
                    run: function() { }
                };
                spyOn(WordCountExercise.Combiner, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCountExercise.Combiner.run', function() {
                expect(WordCountExercise.Combiner.run).toHaveBeenCalled();
            });
        });

        describe('if type equals ShuffleAndSort', function() {
            beforeEach(function () {
                controller = createController("WordCount", "ShuffleAndSort");

                WordCountExercise.ShuffleAndSort = {
                    run: function() { }
                };
                spyOn(WordCountExercise.ShuffleAndSort, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCountExercise.ShuffleAndSort.run', function() {
                expect(WordCountExercise.ShuffleAndSort.run).toHaveBeenCalled();
            });
        });

        describe('if type equals Reducer', function() {
            beforeEach(function () {
                controller = createController("WordCount", "Reducer");

                WordCountExercise.Reducer = {
                    run: function() { }
                };
                spyOn(WordCountExercise.Reducer, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCountExercise.Reducer.run', function() {
                expect(WordCountExercise.Reducer.run).toHaveBeenCalled();
            });
        });
    });

    describe('if name equals Mean', function() {
        beforeEach(inject(function (_$timeout_) {
            $timeout = _$timeout_;
        }));

        describe('if type equals Mapper', function() {
            beforeEach(function () {
                controller = createController("Mean", "Mapper");

                MeanExercise.Mapper = {
                    run: function() { }
                };
                spyOn(MeanExercise.Mapper, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call MeanExercise.Mapper.run', function() {
                expect(MeanExercise.Mapper.run).toHaveBeenCalled();
            });
        });

        describe('if type equals Combiner', function() {
            beforeEach(function () {
                controller = createController("Mean", "Combiner");

                MeanExercise.Combiner = {
                    run: function() { }
                };
                spyOn(MeanExercise.Combiner, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call MeanExercise.Combiner.run', function() {
                expect(MeanExercise.Combiner.run).toHaveBeenCalled();
            });
        });

        describe('if type equals ShuffleAndSort', function() {
            beforeEach(function () {
                controller = createController("Mean", "ShuffleAndSort");

                MeanExercise.ShuffleAndSort = {
                    run: function() { }
                };
                spyOn(MeanExercise.ShuffleAndSort, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call MeanExercise.ShuffleAndSort.run', function() {
                expect(MeanExercise.ShuffleAndSort.run).toHaveBeenCalled();
            });
        });

        describe('if type equals Reducer', function() {
            beforeEach(function () {
                controller = createController("Mean", "Reducer");

                MeanExercise.Reducer = {
                    run: function() { }
                };
                spyOn(MeanExercise.Reducer, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call MeanExercise.Reducer.run', function() {
                expect(MeanExercise.Reducer.run).toHaveBeenCalled();
            });
        });
    });

    describe('if name equals RelativeFrequencies', function() {
        beforeEach(inject(function (_$timeout_) {
            $timeout = _$timeout_;
        }));

        describe('if type equals Mapper', function() {
            beforeEach(function () {
                controller = createController("RelativeFrequencies", "Mapper");

                RelativeFrequenciesExercise.Mapper = {
                    run: function() { }
                };
                spyOn(RelativeFrequenciesExercise.Mapper, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call RelativeFrequenciesExercise.Mapper.run', function() {
                expect(RelativeFrequenciesExercise.Mapper.run).toHaveBeenCalled();
            });
        });

        describe('if type equals Combiner', function() {
            beforeEach(function () {
                controller = createController("RelativeFrequencies", "Combiner");

                RelativeFrequenciesExercise.Combiner = {
                    run: function() { }
                };
                spyOn(RelativeFrequenciesExercise.Combiner, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call RelativeFrequenciesExercise.Combiner.run', function() {
                expect(RelativeFrequenciesExercise.Combiner.run).toHaveBeenCalled();
            });
        });

        describe('if type equals ShuffleAndSort', function() {
            beforeEach(function () {
                controller = createController("RelativeFrequencies", "ShuffleAndSort");

                RelativeFrequenciesExercise.ShuffleAndSort = {
                    run: function() { }
                };
                spyOn(RelativeFrequenciesExercise.ShuffleAndSort, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call RelativeFrequenciesExercise.ShuffleAndSort.run', function() {
                expect(RelativeFrequenciesExercise.ShuffleAndSort.run).toHaveBeenCalled();
            });
        });

        describe('if type equals Reducer', function() {
            beforeEach(function () {
                controller = createController("RelativeFrequencies", "Reducer");

                RelativeFrequenciesExercise.Reducer = {
                    run: function() { }
                };
                spyOn(RelativeFrequenciesExercise.Reducer, 'run');

                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call RelativeFrequenciesExercise.Reducer.run', function() {
                expect(RelativeFrequenciesExercise.Reducer.run).toHaveBeenCalled();
            });
        });
    });
});