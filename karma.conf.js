// Karma configuration
// Generated on Thu May 26 2016 20:20:18 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine-jquery', 'jasmine'],


    plugins: [
        'karma-jasmine',
        'karma-jasmine-jquery',
        'karma-coverage',
        'karma-ng-html2js-preprocessor',
        'karma-chrome-launcher',
        'karma-mocha-reporter'
    ],


    // list of files / patterns to load in the browser
    files: [
        './node_modules/angular/angular.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './node_modules/angular-route/angular-route.min.js',
        './node_modules/angular-animate/angular-animate.min.js',
        './node_modules/angular-material/angular-material.min.js',
        './node_modules/angular-aria/angular-aria.min.js',

        './src/scripts/services/AnimationService.js',

        './src/scripts/controllers/AboutController.js',
        './src/scripts/controllers/AnimationController.js',
        './src/scripts/controllers/ExercisesController.js',
        './src/scripts/controllers/HomeController.js',
        './src/scripts/controllers/MapReduceController.js',
        './src/scripts/controllers/MapReduceExerciseController.js',
        './src/scripts/controllers/MeanController.js',
        './src/scripts/controllers/MeanExerciseController.js',
        './src/scripts/controllers/MenuController.js',
        './src/scripts/controllers/RelativeFrequenciesController.js',
        './src/scripts/controllers/RelativeFrequenciesExerciseController.js',
        './src/scripts/controllers/WordCountController.js',
        './src/scripts/controllers/WordCountExerciseController.js',

        './src/scripts/directives/AnimationControlsDirective.js',
        './src/scripts/directives/MapReduceDirective.js',
        './src/scripts/directives/MeanLabelDirective.js',
        './src/scripts/directives/MenuDirective.js',
        './src/scripts/directives/MapReduceExerciseDirective.js',

        './src/scripts/**/*.js',
        './tests/**/*.spec.js',

        //location of templates
        './src/templates/*.html'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './src/templates/AnimationControls.html': ['ng-html2js'],
        './src/templates/MapReduce.html': ['ng-html2js'],
        './src/templates/MapReduceExercise.html': ['ng-html2js'],
        './src/templates/Menu.html': ['ng-html2js'],
        './src/scripts/controllers/*.js': ['coverage'],
        './src/scripts/directives/*.js': ['coverage'],
        './src/scripts/services/*.js': ['coverage'],
        './src/scripts/*.js': ['coverage']
    },


    ngHtml2JsPreprocessor: {
        // strip app from the file path
        stripPrefix: 'src/'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // reporter options
    mochaReporter: {
        output: 'full'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
