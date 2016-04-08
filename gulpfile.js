var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

var core = 'css/_.css',
	cssFiles = 'css/*.css',
	cssCross = 'css/cross/*.css',
	jsFiles = 'js/villa.js';

gulp.task('css', function() {
	gulp.src(cssFiles)
		.pipe(concat('villa.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('dist/css'));
	gulp.src([core, cssCross])
		.pipe(concat('villa-cross.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('default', function() {
	var villa = ['css', 'js'];
	gulp.watch(villa);
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: "./",
			index: "index.html"
		}
	});

	gulp.watch("*.html").on("change", reload);

});

gulp.task('default', ['serve']);