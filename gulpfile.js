var gulp = require('gulp');
var browserSync = require('browser-sync');
var karma = require('karma');

/**
 * Serve application
 */
gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        port: 8080,
        server: {
            baseDir: ['app'],
            routes: {
                '/app/components': 'app/components'
            }
        }
    });
    gulp.watch(['app/**/*.*'])
         .on('change', browserSync.reload);
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    var server = new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
    server.start();
});
