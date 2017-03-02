/**
 * Created by matthewmicallef on 30/05/2016.
 */

describe('AnimationControlsDirective', function () {

    var element, scope, template;

    beforeEach(module('App'));
    beforeEach(module('templates/AnimationControls.html'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope) {
        //assign the template to the expected url called by the directive and put it in the cache
        template = $templateCache.get('./src/templates/AnimationControls.html');
        $templateCache.put('/App/templates/AnimationControls.html', template);

        scope = $rootScope.$new();
        element = $compile('<animation-controls></animation-controls>')(scope);
        scope.$digest();
    }));

    it('must render a non-empty template', function () {
        expect(element.html()).not.toEqual('');
    });

    describe('when it is rendered', function() {
        var buttons;

        beforeEach(function() {
            buttons = element.find('button');
        });

        it('must render the previous button', function () {
            expect(buttons[0].innerHTML).toContain('&lt;');
        });

        it('must render the play button', function () {
            expect(buttons[1].innerHTML).toContain('PLAY');
        });

        it('must render the stop button', function () {
            expect(buttons[2].innerHTML).toContain('Stop');
        });

        it('must render the next button', function () {
            expect(buttons[3].innerHTML).toContain('&gt;');
        });

        it('must render the slider', function () {
            expect(element.find('md-slider-container')).not.toBeNull();
        });
    });
});