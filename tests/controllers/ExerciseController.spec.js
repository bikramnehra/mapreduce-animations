/**
 * Created by matthewmicallef on 28/06/2016.
 */

/**
 * Created by matthewmicallef on 29/05/2016.
 */

describe('ExerciseController', function() {

    var controller,
        scope;

    beforeEach(module('App'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('exercisesController', {
            $scope: scope
        });
    }));

    it('assigns a pageClass to the scope', function() {
        expect(scope.pageClass).toBe('page-exercises');
    });
});