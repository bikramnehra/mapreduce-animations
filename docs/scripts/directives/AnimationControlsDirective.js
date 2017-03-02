/**
 * Created by matthewmicallef on 16/04/2016.
 */

var animationControlsDirective = function() {
  return {
      restrict: 'E',
      scope: { },
      replace: true,
      templateUrl: "templates/AnimationControls.html",
      controller: animationController
  };
};