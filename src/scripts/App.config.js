/**
 * Created by matthewmicallef on 16/04/2016.
 */

var appConfig = function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/Home.html',
            controller: homeController
        })

        .when('/about', {
            templateUrl: 'pages/About.html',
            controller: aboutController
        })

        // route for the word count animation page
        .when('/wordcount', {
            templateUrl: 'pages/WordCount.html',
            controller: wordCountController
        })

        // route for the mean count animation page
        .when('/mean', {
            templateUrl: 'pages/Mean.html',
            controller: meanController
        })

        // route for the relative frequencies animation page
        .when('/relativefrequencies', {
            templateUrl: 'pages/RelativeFrequencies.html',
            controller: relativeFrequenciesController
        })
        
        // route for the exercises main page
        .when('/exercises', {
            templateUrl: 'pages/Exercises.html',
            controller: exercisesController
        })
        
        // route for the word count exercise page
        .when('/exercises/wordcount', {
            templateUrl: 'pages/exercises/WordCountExercise.html',
            controller: wordCountExerciseController
        })

        // route for the mean exercise page
        .when('/exercises/mean', {
            templateUrl: 'pages/exercises/MeanExercise.html',
            controller: meanExerciseController
        })

        // route for the relative frequencies exercise page
        .when('/exercises/relativefrequencies', {
            templateUrl: 'pages/exercises/RelativeFrequenciesExercise.html',
            controller: relativeFrequenciesExerciseController
        })
};