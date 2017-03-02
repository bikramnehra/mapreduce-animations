/**
 * Created by matthewmicallef on 16/04/2016.
 */

var animationMenuDirective = function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: "templates/Menu.html",
        controller: menuController,
        scope: {
            name: '@name',
            userInput: '=input',
            showMapperPerLine: '@'
        }
    };
};