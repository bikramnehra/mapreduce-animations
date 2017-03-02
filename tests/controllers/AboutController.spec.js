/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('AboutController', function() {

    var controller,
        scope;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('aboutController', {
           $scope: scope
        });
    }));

    it('assigns a pageClass to the scope', function() {
        expect(scope.pageClass).toBe('page-about');
    });

    it('assigns a readMoreAboutTheSite to the scope', function() {
        expect(scope.readMoreAboutTheSite).toBeFalsy();
    });

    it('assigns a readMoreAboutMapReduce to the scope', function() {
        expect(scope.readMoreAboutMapReduce).toBeFalsy();
    });

    describe('toggleReadMoreAboutTheSite', function() {
       it('must toggle the value of readMoreAboutTheSite', function() {
           scope.toggleReadMoreAboutTheSite();
           expect(scope.readMoreAboutTheSite).toBeTruthy();
       });
    });

    describe('toggleReadMoreAboutMapReduce', function() {
        it('must toggle the value of readMoreAboutMapReduce', function() {
            scope.toggleReadMoreAboutMapReduce();
            expect(scope.readMoreAboutMapReduce).toBeTruthy();
        });
    });
});