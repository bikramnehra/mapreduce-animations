/**
 * Created by matthewmicallef on 30/05/2016.
 */

describe('MapReduceDirective', function () {

    var element, scope, template;

    beforeEach(module('App'));
    beforeEach(module('templates/MapReduce.html'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope) {
        //assign the template to the expected url called by the directive and put it in the cache
        template = $templateCache.get('./src/templates/MapReduce.html');
        $templateCache.put('/App/templates/MapReduce.html', template);

        scope = $rootScope.$new();
        element = $compile('<map-reduce></map-reduce>')(scope);
        scope.$digest();
    }));

    it('must render a non-empty template', function () {
        expect(element.html()).not.toEqual('');
    });

    describe('when it is rendered', function() {
        var sections;

        beforeEach(function() {
            sections = element.find('h3');
        });

        it('must render the Map section', function () {
            expect(sections[0].innerHTML).toContain('Map');
        });

        it('must render the Combine section', function () {
            expect(sections[1].innerHTML).toContain('Combine');
        });

        it('must render the Map section', function () {
            expect(sections[2].innerHTML).toContain('Partition');
        });

        it('must render the Map section', function () {
            expect(sections[3].innerHTML).toContain('Shuffle and Sort');
        });

        it('must render the Map section', function () {
            expect(sections[4].innerHTML).toContain('Reduce');
        });
    });

    //Note: Cannot test link function (toggleMapReduceSection) since it only manipulates DOM elements.
});