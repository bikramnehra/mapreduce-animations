/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('AnimationController', function() {

    var controller,
        scope,
        animationService;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        animationService = {
            isAnimationDisabled: function() {
                return false;
            }
        };

        spyOn(animationService, 'isAnimationDisabled');

        scope = $rootScope.$new();
        controller = $controller('animationController', {
            $scope: scope,
            animationService: animationService
        });
    }));

    it('assigns a playStatus to the scope', function() {
        expect(scope.playStatus).toBe('PLAY');
    });

    it('assigns a animationSpeed to the scope', function() {
        expect(scope.animationSpeed).toBe(5);
    });

    describe('isAnimationDisabled', function() {
        it('must call isAnimationDisabled from animation service', function() {
            scope.isAnimationDisabled();
            expect(animationService.isAnimationDisabled).toHaveBeenCalled();
        });
    });

    describe('isStopped', function() {
        it('must return true', function() {
            var result = scope.isStopped();
            expect(result).toBeTruthy();
        });
    });

    describe('isEnded', function() {
        it('must return false', function() {
            var result = scope.isEnded();
            expect(result).toBeFalsy();
        });
    });

    describe('animate', function() {
        beforeEach(function() {
            spyOn(scope, 'togglePlayStatus');
            scope.animate();
        });

        it('must call scope.togglePlayStatus', function() {
            expect(scope.togglePlayStatus).toHaveBeenCalled();
        });
    });

    describe('togglePlayStatus', function() {
        beforeEach(function() {
            scope.togglePlayStatus();
        });

        it('must change playStatus to PAUSE on first call', function() {
            expect(scope.playStatus).toBe('PAUSE');
        });

        it('must change playStatus to PLAY on an alternate call', function() {
            scope.togglePlayStatus();
            expect(scope.playStatus).toBe('PLAY');
        });
    });

    /* Note: rest of function are either private or only use private variables/functions.
       As a result, they cannot be tested.
     */
});