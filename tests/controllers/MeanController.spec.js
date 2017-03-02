/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('MeanController', function() {

    var controller,
        scope,
        animationService;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        animationService = {
            reset: function() { }
        };

        spyOn(animationService, 'reset');

        scope = $rootScope.$new();
        controller = $controller('meanController', {
            $scope: scope,
            animationService: animationService
        });
    }));

    it('assigns an inputList to the scope', function() {
        expect(scope.inputList).toBeDefined();
    });

    it('assigns a userInput to the scope', function() {
        expect(scope.userInput).toBeFalsy();
    });

    it('assigns a pageClass to the scope', function() {
        expect(scope.pageClass).toBe('page-mean');
    });

    it('should call animationService.reset function', function() {
        expect(animationService.reset).toHaveBeenCalled();
    });

    describe('addToList', function() {
        beforeEach(function() {
            var element = document.createElement('test');
            element.value = 2;

            spyOn(document, 'getElementById').and.returnValue(element);
            scope.addToList();
        });


        it('should add an item to scope.inputList', function() {
            expect(scope.inputList.length).toBe(1);
        });

        it('should change scope.userInput to true', function() {
            expect(scope.userInput).toBeTruthy();
        });
    });

    describe('hasSelectedElements', function() {
        it('should return false', function() {
            var result = scope.hasSelectedElements();
            expect(result).toBeFalsy();
        });
    });

    describe('removeSelectedElements', function() {
        beforeEach(function() {
            var element = document.createElement('test');
            element.className = 'label-info';
            element.value = 2;
            element.setAttribute("key", "2");

            spyOn(document, 'getElementsByClassName').and.returnValue([element]);
            spyOn(document, 'getElementById').and.returnValue(element);

            scope.addToList();
            scope.removeSelectedElements();
        });


        it('should add an item to scope.inputList', function() {
            expect(scope.inputList.length).toBe(0);
        });
    });

    describe('if addSampleData() is called', function() {
        beforeEach(function() {
            var element = document.createElement('test');
            element.id = 'meanInputList';

            spyOn(document, 'getElementById').and.returnValue(element);

            scope.addToList();
            scope.removeSelectedElements();
        });

        it('should add the sample data to the inputList', function() {
            scope.addSampleData();
            expect(scope.inputList).not.toBe(null);
        });
    });
});