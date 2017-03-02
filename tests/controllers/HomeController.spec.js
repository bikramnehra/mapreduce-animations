/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('HomeController', function() {

    var controller,
        scope;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('homeController', {
            $scope: scope
        });
    }));

    it('assigns a pageClass to the scope', function() {
        expect(scope.pageClass).toBe('page-home');
    });
});