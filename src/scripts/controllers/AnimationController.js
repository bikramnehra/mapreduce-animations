/**
 * Created by matthewmicallef on 05/04/2016.
 */

var animationController = function($scope, animationService, $timeout) {
    $scope.playStatus = "PLAY";
    $scope.animationSpeed = 5;

    var playing = false;
    var isStopped = true;
    var isEnded = false;
    var timer;
    var containerElement;
    var currentAnimationStep = 0;
    var currentContainerStep = 1;

    $scope.isAnimationDisabled = function() {
        return animationService.isAnimationDisabled();
    };

    $scope.isStopped = function() {
        return isStopped;
    };

    $scope.isEnded = function() {
        return isEnded;
    };

    $scope.animate = function() {
        $scope.togglePlayStatus();

        if(playing) {
            play();
        } else {
            pause();
        }
    };

    $scope.togglePlayStatus = function() {
        if(playing) {
            playing = false;
            $scope.playStatus = "PLAY";
        } else {
            playing = true;
            $scope.playStatus = "PAUSE";
        }
    };

    var play = function() {
        if(!isEnded) {
            isStopped = false;
            clickContainerButton(currentAnimationStep, 'jsavforward');

            updateForwardSteps();
            updateAnimationSteps();

            timer = $timeout(function() {
                play();
            }, (Math.ceil(5000 / $scope.animationSpeed)));
        }
    };

    var pause = function() {
        $timeout.cancel(timer);
    };

    $scope.stop = function() {
        isStopped = true;
        isEnded = false;

        for(var i = currentAnimationStep; i >= 0; i--) {
            clickContainerButton(i, 'jsavbegin');
        }

        currentContainerStep = 1;
        currentAnimationStep = 0;
    };

    $scope.next = function() {
        if(!isEnded) {
            isStopped = false;
            clickContainerButton(currentAnimationStep, 'jsavforward');
            updateForwardSteps();
            updateAnimationSteps();
        }
    };

    $scope.previous = function() {
        if(!isStopped) {
            isEnded = false;
            clickContainerButton(currentAnimationStep, 'jsavbackward');
            updateBackwardSteps();
            updateAnimationSteps();
        }
    };

    var getCurrentContainerSteps = function() {
        var splitCounter = -1;
        if(!containerElement) {
            containerElement = animationService.getJSAVInstances()[0].container[0];
            splitCounter = containerElement.getElementsByClassName('jsavcounter')[0].innerHTML.split("/");
        } else {
            splitCounter = containerElement.getElementsByClassName('jsavcounter')[0].innerHTML.split("/");
        }

        return Number(splitCounter[1]);
    };

    var clickContainerButton = function(jsavInstancePos, buttonName) {
        var instances = animationService.getJSAVInstances();

        if(buttonName === 'jsavbackward') {
            if(currentContainerStep === 1) {
                updateBackwardSteps();
                jsavInstancePos -= 1;
            }

            currentContainerStep--;

        } else if (buttonName === 'jsavforward') {
            if(currentContainerStep !== getCurrentContainerSteps()) {
                currentContainerStep++;
            } else {
                updateForwardSteps();
                jsavInstancePos += 1;
            }
        }

        var currentInstance = instances[jsavInstancePos];
        var containerId = currentInstance.container[0].id;
        containerElement = document.getElementById(containerId);
        $(currentInstance.container[0].getElementsByClassName('jsavcanvas')).scrollintoview();
        var button = containerElement.getElementsByClassName(buttonName);
        $(button).click();
    };

    var updateForwardSteps = function() {
        var instances = animationService.getJSAVInstances();

        if((currentContainerStep === getCurrentContainerSteps()) &&
           ((currentAnimationStep + 1) !== instances.length)) {

            currentAnimationStep++;
            currentContainerStep = 1;
        }
    };

    var updateBackwardSteps = function() {
        if(currentContainerStep === 1 && currentAnimationStep !== 0) {
            currentAnimationStep--;

            var instances = animationService.getJSAVInstances();
            containerElement = instances[currentAnimationStep].container[0];
            currentContainerStep = getCurrentContainerSteps();
        }
    };

    var updateAnimationSteps = function() {
        var instances = animationService.getJSAVInstances();

        if(currentAnimationStep === 0 && currentContainerStep === 1) {
            isStopped = true;
        }

        if(currentAnimationStep === (instances.length - 1) &&
           (currentContainerStep === getCurrentContainerSteps())) {
            isEnded = true;

            if(playing) {
                $scope.togglePlayStatus();
                pause();
            }
        }
    };
};