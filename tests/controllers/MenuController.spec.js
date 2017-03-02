/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('MenuController', function() {

    var controller,
        scope,
        animationService;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        animationService = {
            toggleUseCombiners: function() { },
            toggleShowPartitioners: function() { },
            toggleAnimationDisabled: function() { }
        };

        spyOn(animationService, 'toggleUseCombiners');
        spyOn(animationService, 'toggleShowPartitioners');
        spyOn(animationService, 'toggleAnimationDisabled');

        scope = $rootScope.$new();
        controller = $controller('menuController', {
            $scope: scope,
            animationService: animationService
        });
    }));

    it('assigns a showLoader to the scope', function() {
        expect(scope.showLoader).toBeFalsy();
    });

    it('assigns a mapperPerLine to the scope', function() {
        expect(scope.mapperPerLine).toBeFalsy();
    });

    it('assigns a showMenu to the scope', function() {
        expect(scope.showMenu).toBeTruthy();
    });

    describe('toggleMapperPerLine', function() {
        it('toggles the value of mapperPerLine', function() {
            scope.toggleMapperPerLine();
            expect(scope.mapperPerLine).toBeTruthy();
        });
    });

    describe('toggleMenu', function() {
        beforeEach(function() {
            scope.toggleMenu();
        });

        it('should change scope.showMenu to false on first call', function() {
            expect(scope.showMenu).toBeFalsy();
        });

        it('should change scope.showMenu to true on an alternate call', function() {
            scope.toggleMenu();
            expect(scope.showMenu).toBeTruthy();
        });
    });

    describe('toggleUseCombiners', function() {
        it('calls animationService.toggleUseCombiners()', function() {
            scope.toggleUseCombiners();
            expect(animationService.toggleUseCombiners).toHaveBeenCalled();
        });
    });

    describe('toggleShowPartitioners', function() {
        it('calls animationService.toggleShowPartitioners()', function() {
            scope.toggleShowPartitioners();
            expect(animationService.toggleShowPartitioners).toHaveBeenCalled();
        });
    });

    describe('runMapReduce', function() {
        var $timeout;

        beforeEach(inject(function(_$timeout_) {
            Utils.MapReduce = {
                reset: function() { }
            };
            spyOn(Utils.MapReduce, 'reset');

            var element = document.createElement('test');
            element.value = 2;

            var menuIcon = document.createElement('div');
            menuIcon.className = 'glyphicon-menu-right glyphicon-menu-down';

            spyOn(document, 'getElementById').and.returnValue(element);
            spyOn(document, 'getElementsByClassName').and.returnValue([menuIcon, menuIcon]);

            $timeout = _$timeout_;
        }));

        it('should change scope.showLoader to true', function() {
            scope.runMapReduce();
            expect(scope.showLoader).toBeTruthy();
        });

        describe('if scope.name is set to WordCount', function() {
            beforeEach(function() {
                WordCount = {
                    setAnimationService: function() { },
                    runWordCountMapReduce: function() { }
                };
                spyOn(WordCount, 'setAnimationService');
                spyOn(WordCount, 'runWordCountMapReduce');

                scope.name = "WordCount";
                scope.runMapReduce();

                // flush timeout(s) for all code under test.
                $timeout.flush();

                // this will throw an exception if there are any pending timeouts.
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCount.setAnimationService', function() {
                expect(WordCount.setAnimationService).toHaveBeenCalled();
            });

            it('should call WordCount.runWordCountMapReduce', function() {
                expect(WordCount.runWordCountMapReduce).toHaveBeenCalled();
            });

            it('should change scope.showLoader back to false', function() {
                expect(scope.showLoader).toBeFalsy();
            });

            it('should call animationService.toggleAnimationDisabled', function() {
                expect(animationService.toggleAnimationDisabled).toHaveBeenCalled();
            });
        });

        describe('if scope.name is set to Mean', function() {
            beforeEach(function() {
                Mean = {
                    setAnimationService: function() { },
                    runMeanMapReduce: function() { }
                };
                spyOn(Mean, 'setAnimationService');
                spyOn(Mean, 'runMeanMapReduce');

                scope.name = "Mean";
                scope.runMapReduce();
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCount.setAnimationService', function() {
                expect(Mean.setAnimationService).toHaveBeenCalled();
            });

            it('should call WordCount.runWordCountMapReduce', function() {
                expect(Mean.runMeanMapReduce).toHaveBeenCalled();
            });

            it('should change scope.showLoader back to false', function() {
                expect(scope.showLoader).toBeFalsy();
            });

            it('should call animationService.toggleAnimationDisabled', function() {
                expect(animationService.toggleAnimationDisabled).toHaveBeenCalled();
            });
        });

        describe('if scope.name is set to RelativeFrequencies', function() {
            beforeEach(function() {
                RelativeFrequencies = {
                    setAnimationService: function() { },
                    runRelativeFrequenciesMapReduce: function() { }
                };
                spyOn(RelativeFrequencies, 'setAnimationService');
                spyOn(RelativeFrequencies, 'runRelativeFrequenciesMapReduce');

                scope.name = "RelativeFrequencies";
                scope.runMapReduce();
                $timeout.flush();
                $timeout.verifyNoPendingTasks();
            });

            it('should call WordCount.setAnimationService', function() {
                expect(RelativeFrequencies.setAnimationService).toHaveBeenCalled();
            });

            it('should call WordCount.runWordCountMapReduce', function() {
                expect(RelativeFrequencies.runRelativeFrequenciesMapReduce).toHaveBeenCalled();
            });

            it('should change scope.showLoader back to false', function() {
                expect(scope.showLoader).toBeFalsy();
            });

            it('should call animationService.toggleAnimationDisabled', function() {
                expect(animationService.toggleAnimationDisabled).toHaveBeenCalled();
            });
        });
    });
});