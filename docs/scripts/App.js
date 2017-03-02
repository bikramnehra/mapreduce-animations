/**
 * Created by matthewmicallef on 28/03/2016.
 */

var app = angular.module('App', ['ngRoute', 'ngAnimate', 'ngMaterial']);

app.config(appConfig);

//services
app.service('animationService', animationService);

//controllers
app.controller('aboutController', aboutController);
app.controller('animationController', animationController);
app.controller('homeController', homeController);
app.controller('mapReduceController', mapReduceController);
app.controller('meanController', meanController);
app.controller('menuController', menuController);
app.controller('relativeFrequenciesController', relativeFrequenciesController);
app.controller('wordCountController', wordCountController);
app.controller('exercisesController', exercisesController);
app.controller('mapReduceExerciseController', mapReduceExerciseController);
app.controller('wordCountExerciseController', wordCountExerciseController);
app.controller('meanExerciseController', meanExerciseController);
app.controller('relativeFrequenciesExerciseController', relativeFrequenciesExerciseController);

//directives
app.directive('animationMenu', animationMenuDirective);
app.directive('mapReduce', mapReduceDirective);
app.directive('animationControls', animationControlsDirective);
app.directive('meanLabel', meanLabelDirective);
app.directive('mapReduceExercise', mapReduceExerciseDirective);