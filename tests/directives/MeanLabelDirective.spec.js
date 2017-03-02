/**
 * Created by matthewmicallef on 30/05/2016.
 */

describe('MeanLabelDirective', function () {

    var element, scope, template, compile;

    beforeEach(module('App'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        compile = $compile;
    }));

    it('must render a non-empty template', function () {
        element = compile('<mean-label></mean-label>')(scope);
        scope.$digest();
        expect(element.html()).not.toEqual('');
    });

    describe('when it is rendered', function() {
        it('must contain a key and an integer', function () {
            expect(element[0].innerHTML).toContain('Key');
            expect(element[0].innerHTML).toContain('Integer');
        });

        describe('if key is defined', function() {
            beforeEach(function() {
                scope.key = 'test';
                element = compile('<mean-label key="key"></mean-label>')(scope);
                scope.$digest();
            });

            it('key on isolated scope must be one-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.key = 'hello';
                expect(scope.key).toEqual('test');
            });
        });

        describe('if integer is defined', function() {
            beforeEach(function() {
                scope.integer = 1;
                element = compile('<mean-label integer="integer"></mean-label>')(scope);
                scope.$digest();
            });

            it('key on isolated scope must be one-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.integer = 20;
                expect(scope.integer).toEqual(1);
            });
        });

        it('should not have a label-info class', function() {
            expect(element.hasClass('label-info')).toBeFalsy();
        });

        describe('if the label is clicked', function() {
            beforeEach(function() {
                element.triggerHandler('click');
                scope.$digest();
            });

            it('should add a label-info class to the element on first click', function() {
                expect(element.hasClass('label-info')).toBeTruthy();
            });

            it('should remove a label-info class from the element on an alternate click', function() {
                expect(element.hasClass('label-info')).toBeFalsy();
            });
        });
    });
});