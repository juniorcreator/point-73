var syntax        = 'scss'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync'),
		sourcemaps 		= require('gulp-sourcemaps'),
 		babel = require('gulp-babel');

gulp.task('browser-sync', function() {
	browserSync({
		proxy: false,
		host: 'localhost',
		server: './',
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	});
});

gulp.task('styles', function() {
	return gulp.src('resources/sass/app.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' })).on('error', function (err) {
		console.log(err.toString());
		this.emit('end');
	})
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('public/css'))
	.pipe(browserSync.stream())
});

gulp.task('es', () => {
			return  gulp.src('resources/js/app.js')
					.pipe(babel({
						presets: ['es2015']
					}))
					.pipe(gulp.dest('public/js'))
});
gulp.task('build', function() {
	return gulp.src('resources/sass/app.scss')
			.pipe(sass({ outputStyle: 'expanded' })).on('error', function (err) {
				console.log(err.toString());
				this.emit('end');
			})
			.pipe(autoprefixer(['last 15 versions']))
			.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
			.pipe(gulp.dest('public/css'))
			.pipe(browserSync.stream())
});

gulp.task('watch', ['styles', 'es', 'browser-sync'], function() {
	gulp.watch('resources/sass/**/*.scss', ['styles']);
	gulp.watch(['resources/js/**/*.js'], ['es']);
	gulp.watch('./*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
