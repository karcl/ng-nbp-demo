var gulp = require('gulp');
var browserSync = require('browser-sync');
var karma = require('karma');
var proxyMiddleware = require('http-proxy-middleware');

/**
 * Serve application
 */
gulp.task('serve', function () {
    var proxy = proxyMiddleware('/nbp-server', {
        target: 'http://www.nbp.pl',
        changeOrigin: true,
        ws: true
    });

    browserSync.init({
        notify: false,
        port: 8080,
        server: {
            baseDir: ['app', 'app/data'],
            routes: {
                '/app/components': 'app/components'
            },
//            middleware: function (req, res, next) {
//                // Allow cross origin resource sharing for access to outside
//                // ... didn't work :(
//                res.setHeader('Access-Control-Allow-Origin', '*');
//                next();
//            }
            middleware: [proxy] // doesn't work also :(
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
        singleRun: true,
        reporters: ['spec', 'coverage']
    }, done);
    server.start();
});
