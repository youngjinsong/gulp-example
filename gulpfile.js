/**
 * Client source build manager
 * 
 * @author dodortus (dodortus@gmail.com)
 * @fileOverview 클라이언트 정적파일 빌드 및 감지 메니저 
 * @REF http://programmingsummaries.tistory.com/356
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
//const imagemin = require('gulp-imagemin');

const watch = require('gulp-watch');
const livereload = require('gulp-livereload');  // chrome livereload plugin 설치 필요.

const src = 'public/src';   // source directory path
const dist = 'public/dist'; // result directory path
const paths = {
	js: src + '/js/*.js',
	css: src + '/css/*.css',
	scss: src + '/scss/*.scss',
	img: src + '/img/*'
};

/**
 * 자바스크립트 파일을 하나로 합치고 압축한다.
 * 개별파일설정  gulp.src([file1.js', file2.js'])
 */ 
gulp.task('combine-js', function() {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'))
		.pipe(livereload());
});

// CSS 압축
gulp.task('combine-css', function() {
  return gulp.src(paths.css)
    .pipe(concat('main.css'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest(dist + '/css'))
    .pipe(livereload());
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-scss', function() {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(src + '/css'));
});

// image 최적화 압축
/*
gulp.task('combine-img', function() {
  return gulp.src(paths.img)
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(gulp.dest(dist + '/img'));
});
*/

// 파일 변경 감지
gulp.task('watch', function() {
  livereload.listen();
  
  watch(paths.js).on('change', function(path) {
    console.log('File (' + path + ') was running tasks...');
    gulp.start('combine-js');
  });
  
  watch(paths.css).on('change', function(path) {
    console.log('File (' + path + ') was running tasks...');
    gulp.start('combine-css');
  });
  
  watch(paths.scss).on('change', function(path) {
    console.log('File (' + path + ') was running tasks...');
    gulp.start('combine-css');
  });
});

// 기본 task 설정 
gulp.task('default', ['combine-js', 'combine-css']);

// 실시간 build
gulp.task('live', ['watch']);