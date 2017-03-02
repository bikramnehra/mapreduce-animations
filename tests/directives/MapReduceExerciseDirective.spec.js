/**
 * Created by matthewmicallef on 28/06/2016.
 */

describe('MapReduceExerciseDirective', function () {

    var element, scope, template, compile;

    beforeEach(module('App'));
    beforeEach(module('templates/MapReduceExercise.html'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope) {
        //assign the template to the expected url called by the directive and put it in the cache
        template = $templateCache.get('./src/templates/MapReduceExercise.html');
        $templateCache.put('/App/templates/MapReduceExercise.html', template);

        scope = $rootScope.$new();
        compile = $compile;
        element = compile('<map-reduce-exercise></map-reduce-exercise>')(scope);
        scope.$digest();
    }));

    it('must render a non-empty template', function () {
        expect(element.html()).not.toEqual('');
    });

    describe('when it is rendered', function() {
        describe('if name is defined', function() {
            beforeEach(function() {
                scope.name = 'WordCount';
                element = compile('<map-reduce-exercise name="name"></map-reduce-exercise>')(scope);
                scope.$digest();
            });

            it('name on isolated scope must be one-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.name = 'hello';
                expect(scope.name).toEqual('WordCount');
            });
        });

        describe('if type is defined', function() {
            beforeEach(function() {
                scope.type = 'Mapper';
                element = compile('<map-reduce-exercise type="type"></map-reduce-exercise>')(scope);
                scope.$digest();
            });

            it('type on isolated scope must be one-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.type = 'hello';
                expect(scope.type).toEqual('Mapper');
            });
        });
    });
});