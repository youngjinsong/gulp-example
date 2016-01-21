// @REF http://programmingsummaries.tistory.com/356

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

var src = 'public/src';   // source directory path
var dist = 'public/dist'; // result directory path
var paths = {
	js: src + '/js/*.js',
	css: src + '/css/*.css'
};

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function() {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

gulp.task('combine-css', function() {
  return gulp.src(paths.css)
    .pipe(concat('main.css'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(dist + '/css'));
});

// 웹서버를 실행한다 (default localhost:8000)
gulp.task('server', function () {
  gulp.src(dist + '/').pipe(webserver({
    port: 9292
  }));
});

// 파일 변경 감지
gulp.task('watch', function() {
  watch(paths.js).on('change', function(path) {
    console.log('File (' + path + ') was running tasks...');
    gulp.start('combine-js');
  });
  
  watch(paths.css).on('change', function(path) {
    console.log('File (' + path + ') was running tasks...');
    gulp.start('combine-css');
  });
  
  //livereload.listen();
  //console.log('Watch for changes and live reloads Chrome. Requires the Chrome extension \'LiveReload\'.');
  //gulp.watch(dist + '/**').on('change', livereload.changed);
});

/*
// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function() {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function() {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});
*/

// 기본 task 설정 - build
gulp.task('default', ['combine-js', 'combine-css']);

// 실시간 build
gulp.task('livebuild', ['watch']);