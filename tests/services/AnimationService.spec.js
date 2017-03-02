/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('AnimationService', function () {

    var animationService;
    beforeEach(module('App'));
    beforeEach(inject(function (_animationService_) {
        animationService = _animationService_;
    }));

    describe('isUsingCombiners', function () {
        it('must return the value of useCombiners', function () {
            var result = animationService.isUsingCombiners();
            expect(result).toBeFalsy();
        });
    });

    describe('isShowingPartitioners', function () {
        it('must return the value of isShowingPartitioners', function () {
            var result = animationService.isShowingPartitioners();
            expect(result).toBeFalsy();
        });
    });

    describe('isAnimationDisabled', function () {
        it('must return the value of isAnimationDisabled', function () {
            var result = animationService.isAnimationDisabled();
            expect(result).toBeTruthy();
        });
    });

    describe('toggleUseCombiners', function () {
        it('must toggle the value of toggleUseCombiners', function () {
            animationService.toggleUseCombiners();
            var result = animationService.isUsingCombiners();
            expect(result).toBeTruthy();
        });
    });

    describe('toggleShowPartitioners', function () {
        it('must toggle the value of toggleShowPartitioners', function () {
            animationService.toggleShowPartitioners();
            var result = animationService.isShowingPartitioners();
            expect(result).toBeTruthy();
        });
    });

    describe('toggleAnimationDisabled', function () {
        it('must toggle the value of toggleAnimationDisabled', function () {
            animationService.isAnimationDisabled();
            var result = animationService.toggleAnimationDisabled();
            expect(result).toBeFalsy();
        });
    });

    describe('getJSAVInstances', function () {
        it('must return the JSAV instances', function () {
            var result = animationService.getJSAVInstances();
            expect(result).toBeNull();
        });
    });

    describe('setJSAVInstances', function () {
        it('must set the JSAV instances', function () {
            animationService.setJSAVInstances(1);
            var result = animationService.getJSAVInstances();
            expect(result).toBe(1);
        });
    });

    describe('reset', function () {
        it('must reset all variables to the initial value', function () {
            animationService.reset();
            var result1 = animationService.isUsingCombiners();
            var result2 = animationService.isShowingPartitioners();
            var result3 = animationService.isAnimationDisabled();
            var result4 = animationService.getJSAVInstances();
            expect(result1).toBeFalsy();
            expect(result2).toBeFalsy();
            expect(result3).toBeTruthy();
            expect(result4).toBeNull();
        });
    });

});