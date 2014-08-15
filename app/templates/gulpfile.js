var gulp       = require('gulp');
//var deploy   = require('gulp-gh-pages');
var stylus     = require('gulp-stylus');
var zip        = require('gulp-zip');
var rename     = require('gulp-rename');
var jade       = require('gulp-jade');
var webserver  = require('gulp-webserver');
var dateFormat = require('dateformat');
var nib        = require('nib');
var path       = require('path');

/* Stylus task
------------------------------------------------------------------ */

gulp.task('stylus', function() {

    gulp.src(['src/stylus/main.styl', 'src/stylus/ie.styl'])
        .pipe(stylus({
            use: [nib()]
        }))
        .on('error', console.log)
        .pipe(gulp.dest('dist/css/'))
        //.pipe(rename({suffix: '.min'}))
        //.pipe(minifycss())
        //.pipe(gulp.dest('dist/css/'));

});

/* JS task
------------------------------------------------------------------ */

gulp.task('js', function() {

    // gulp.src(['src/js/**/*.js']) //, '!./src/js/vendor/**/*.js'
    //     //.pipe(concat('main.js'))
    //     .on('error', console.log)
    //     .pipe(gulp.dest('dist/js'));

});

/* Jade task 
------------------------------------------------------------------ */

gulp.task('jade', function() {

    gulp.src(['src/jade/*.jade'])
        .pipe(jade({
            pretty: true
        }))
        .on('error', console.log)
        .pipe(gulp.dest('dist/'));
});

/* Image task 
------------------------------------------------------------------ */

gulp.task('images', function() {

    /*gulp.src(['src/img/*.png','src/img/*.jpg','src/img/*.gif','src/img/*.jpeg'])
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'));*/

});

/* HTTP-server task 
------------------------------------------------------------------ */

gulp.task('http-server', function() {

    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            open: true,
            port: 9000
        }));
});

/* Release task 
------------------------------------------------------------------ */

gulp.task('release', function() {
    gulp.src(['dist/**/*', '!.git/**/*'])
        .pipe(zip([path.basename(__dirname), 'release', dateFormat(new Date(), 'dd.mm.yyyy'), 'zip'].join('.')))
        .on('error', console.log)
        .pipe(gulp.dest('./'))
});

/* Backup task 
------------------------------------------------------------------ */

gulp.task('backup', function() {

    gulp.src(['./**/*', '!node_modules/**/*'])
        .pipe(zip([path.basename(__dirname), 'backup', dateFormat(new Date(), 'dd.mm.yyyy'), 'zip'].join('.')))
        .on('error', console.log)
        .pipe(gulp.dest('./'))
});

/* Watch task
------------------------------------------------------------------ */

gulp.task('watch', ['http-server', 'stylus', 'jade'], function() {

    // Stylus
    gulp.watch('src/stylus/**/*', ['stylus']);

    // Jade
    gulp.watch('src/jade/**/*', ['jade']);

    // Images
    //gulp.watch('src/img/**/*', ['images']);

    // Javascript
    //gulp.watch('src/js/**/*', ['js']);

});