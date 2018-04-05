var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');

var browserify = require('browserify');
var source = require('vinyl-source-stream');


gulp.task('compile', function(){
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['compile', 'bundle']);
  gulp.watch('src/**/*.html', ['copy']);
});

gulp.task('start', function(){
  nodemon({
    watch: 'dist',
    script: 'dist/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development'}
  })
});

gulp.task('bundle', function(){
  var b = browserify({
    entries: 'src/index.js',
    debug: true
  })
    .transform('babelify', { presets: ['es2015']});

  return b.bundle()
           .pipe(source('build/application.js'))
           .pipe(gulp.dest('dist'));
});

gulp.task('default', function(callback){
  sequence(['compile', 'watch', 'copy', 'bundle'], 'start', callback);
});