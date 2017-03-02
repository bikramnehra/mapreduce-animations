/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('MapReduceController', function() {

    var controller,
        scope,
        animationService;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        animationService = {
            isUsingCombiners: function() {
                return true;
            },
            isShowingPartitioners: function() {
                return true;
            }
        };

        spyOn(animationService, 'isUsingCombiners');
        spyOn(animationService, 'isShowingPartitioners');

        scope = $rootScope.$new();
        controller = $controller('mapReduceController', {
            $scope: scope,
            animationService: animationService
        });
    }));

    describe('showCombiners', function() {
        it('must call animationService.isUsingCombiners()', function() {
            scope.showCombiners();
            expect(animationService.isUsingCombiners).toHaveBeenCalled();
        });
    });

    describe('showPartitioners', function() {
        it('must call animationService.isShowingPartitioners()', function() {
            scope.showPartitioners();
            expect(animationService.isShowingPartitioners).toHaveBeenCalled();
        });
    });
});