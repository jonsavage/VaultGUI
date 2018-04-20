// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// someComment
// Default Task
gulp.task('default', ['lint']);
