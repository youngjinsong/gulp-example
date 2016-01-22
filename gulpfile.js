// @REF http://programmingsummaries.tistory.com/356

const gulp = require('gulp');
const sass = require('gulp-sass');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const Imagemin = require('imagemin');

const watch = require('gulp-watch');
const webserver = require('gulp-webserver');
const livereload = require('gulp-livereload');

const src = 'public/src';   // source directory path
const dist = 'public/dist'; // result directory path
const paths = {
	js: src + '/js/*.js',
	css: src + '/css/*.css',
	scss: src + '/scss/*.scss',
	img: src + '/img/*'
};

// 자바스크립트 파일을 하나로 합치고 압축한다.
// 개별파일설정  gulp.src([file1.js', file2.js'])
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

gulp.task('combine-img', function() {
  new Imagemin()
    .src(paths.img)         // *.{gif,jpg,png,svg}
    .dest(dist + '/img')
    .use(Imagemin.jpegtran({progressive: true}))
    .use(Imagemin.optipng({optimizationLevel: 7}))
    .run(function(err, files) {
      console.log(files);
      //=> {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
    });
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-scss', function() {
  return gulp.src(paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(src + '/css'));
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
  
  watch(paths.scss).on('change', function(path) {
    console.log('File (' + path + ') was running tasks...');
    gulp.start('combine-css');
  });
  
  //livereload.listen();
  //console.log('Watch for changes and live reloads Chrome. Requires the Chrome extension \'LiveReload\'.');
  //gulp.watch(dist + '/**').on('change', livereload.changed);
});

/*


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