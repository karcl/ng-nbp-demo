// Karma configuration
// Generated on Sun Nov 15 2015 15:10:34 GMT+0100 (CET)

module.exports = function(config) {
  config.set({
    plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher',
        'karma-spec-reporter',
        'karma-coverage'
    ],

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/components/angular/angular.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/components/angular-bootstrap/ui-bootstrap.js',
      'app/components/angular-animate/angular-animate.js',
      'app/components/angular-ui-grid/ui-grid.js',
      'app/components/abdmob/x2js/xml2json.js',
      'app/components/angular-xml/angular-xml.js',

      'app/js/**/*.js',
      'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/js/**/*.js' : ['coverage']
    },

    coverageReporter: {
        includeAllSources: true,
        reporters: [ { type: 'text' } ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 8081,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: 2
  })
}
