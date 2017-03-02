/**
 * Created by matthewmicallef on 05/04/2016.
 */

var animationService = function() {
    var useCombiners = false;
    var showPartitioners = false;
    var animationDisabled = true;
    var jsavInstances = null;

    this.isUsingCombiners = function() {
        return useCombiners;
    };

    this.isShowingPartitioners = function() {
        return showPartitioners;
    };

    this.isAnimationDisabled = function() {
        return animationDisabled;
    };

    this.toggleUseCombiners = function() {
        useCombiners = !useCombiners;
    };

    this.toggleShowPartitioners = function() {
        showPartitioners = !showPartitioners;
    };

    this.toggleAnimationDisabled = function() {
        animationDisabled = false;
    };

    this.getJSAVInstances = function() {
        return jsavInstances;
    };

    this.setJSAVInstances = function(instances) {
        jsavInstances = instances;
    };

    //TODO (if-time): This could be fixed (removed) by using a parent directive for communication.
    this.reset = function() {
        useCombiners = false;
        showPartitioners = false;
        animationDisabled = true;
        jsavInstances = null;
    };
};