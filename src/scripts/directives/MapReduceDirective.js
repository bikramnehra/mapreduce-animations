/**
 * Created by matthewmicallef on 16/04/2016.
 */

var mapReduceDirective = function() {
    return {
        restrict: 'E',
        scope: { },
        replace: true,
        templateUrl: "templates/MapReduce.html",
        controller: mapReduceController,
        link: function(scope) {
            scope.toggleMapReduceSection = function(sectionName) {
                var element = document.getElementById(sectionName);

                if(element) {
                    if(element.clientHeight === 0) {
                        $(element).slideDown("slow");

                        var canvas = element.getElementsByClassName("jsavcanvas");
                        if(canvas) {
                            $(canvas[0]).scrollintoview();
                        }
                    } else {
                        $(element).slideUp("slow");
                    }

                    if(element.innerHTML) {
                        var menuRightIcon = element.previousElementSibling.getElementsByClassName("glyphicon-menu-right");
                        $(menuRightIcon).toggleClass("closed");
                        var menuDownIcon = element.previousElementSibling.getElementsByClassName("glyphicon-menu-down");
                        $(menuDownIcon).toggleClass("closed");
                    }
                }
            };
        }
    };
};