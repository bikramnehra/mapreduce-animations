/**
 * Created by matthewmicallef on 30/05/2016.
 */

describe('MenuDirective', function () {

    var element, scope, template, compile;

    beforeEach(module('App'));
    beforeEach(module('templates/Menu.html'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope) {
        //assign the template to the expected url called by the directive and put it in the cache
        template = $templateCache.get('./src/templates/Menu.html');
        $templateCache.put('/App/templates/Menu.html', template);

        scope = $rootScope.$new();
        compile = $compile;
        element = compile('<animation-menu></animation-menu>')(scope);
        scope.$digest();
    }));

    it('must render a non-empty template', function () {
        expect(element.html()).not.toEqual('');
    });

    describe('when it is rendered', function() {
        beforeEach(function() {
            element = compile('<animation-menu></animation-menu>')(scope);
            scope.$digest();
        });

        it('must render the Menu button', function () {
            var menuButton = element.find('button');
            expect(menuButton[0].innerHTML).toContain('MENU');
        });

        it('must render only two checkboxes', function () {
            var menuCheckboxes = element.find('md-checkbox');
            expect(menuCheckboxes.length).toEqual(2);
        });

        describe('if showMapperPerLine is defined', function() {
            beforeEach(function() {
                scope.showMapperPerLine = true;
                element = compile('<animation-menu show-mapper-per-line="showMapperPerLine"></animation-menu>')(scope);
                scope.$digest();
            });

            it('must render three checkboxes', function() {
                var menuCheckboxes = element.find('md-checkbox');
                expect(menuCheckboxes.length).toEqual(3);
            });

            it('showMapperPerLine on isolated scope must be one-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.showMapperPerLine = false;
                expect(scope.showMapperPerLine).toBeTruthy();
            });
        });

        describe('if name is defined', function() {
            beforeEach(function() {
                scope.name = 'test';
                element = compile('<animation-menu name="name"></animation-menu>')(scope);
                scope.$digest();
            });

            it('name on isolated scope must be one-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.name = 'hello';
                expect(scope.name).toEqual('test');
            });
        });

        describe('if userInput is defined', function() {
            beforeEach(function() {
                scope.userInput = {
                    config: 'test'
                };
                element = compile('<animation-menu input="userInput"></animation-menu>')(scope);
                scope.$digest();
            });

            it('name on isolated scope must be two-way bound', function() {
                var isolatedScope = element.isolateScope();
                isolatedScope.userInput.config = 'hello';
                expect(scope.userInput.config).toEqual('hello');
            });
        });

        it('must render the number of mappers input', function () {
            var numberOfMappersInput = element.find('input');
            expect(numberOfMappersInput).toBeDefined();
        });

        it('must render the run button', function () {
            var runButton = element.find('button');
            expect(runButton[1].innerHTML).toContain('Run MapReduce');
        });
    });
});