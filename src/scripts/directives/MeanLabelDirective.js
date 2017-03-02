/**
 * Created by matthewmicallef on 24/04/2016.
 */

var meanLabelDirective = function() {
    return {
        restrict: 'E',
        scope: {
            key: "@",
            integer: "@"
        },
        replace: true,
        template: "<span class='label label-default' ng-click='highlight()'>" +
                    "Key: {{key}} Integer: {{integer}}" +
                  "</span>",
        link: function(scope, element) {
            scope.highlight = function() {
                if(element.hasClass('label-info')) {
                    element.removeClass('label-info');
                } else {
                    element.addClass('label-info');
                }
            };
        }
    };
};