var gulp        = require('gulp'),
	postcss 	    = require('gulp-postcss'),
	//cssnext 	    = require('postcss-cssnext'),
	uglify       = require('gulp-uglify'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	autoprefixer = require('autoprefixer'),
	notify       = require('gulp-notify'),
	sass         = require('gulp-sass'),
	concat       = require('gulp-concat'),
	browserSync  = require('browser-sync'),
	lost         = require('lost');

var watch_paths = {
	scripts: ['assets/js/*.js'],
	styles:  ['assets/css/scss/*.scss']
};

// Scripts Task
gulp.task('scripts', function() {
	return gulp.src([
	//'./assets/js/libs/slick.min.js',
	//'./bower_components/webcomponentsjs/webcomponents.min.js',
	'./assets/js/src/*.js'
	])
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./assets/js/'))
	.pipe(notify({ message: 'Scripts task complete' }))
});

// Styles Task
gulp.task('styles', function() {
	var processors = [
		lost,
		autoprefixer({browsers:['last 2 version']})
	];

	gulp.src(watch_paths.styles)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(postcss(processors))
		.pipe(gulp.dest('assets/css'))
		.pipe(notify({ message: 'Styles task complete' }))
		//.pipe(browserSync.stream({match: '**/*.css'}));
});

// BrowserSync Styles Task
//gulp.task('styles-watch', ['styles'], browserSync.reload);

// Watch Task
gulp.task('watch', function() {
	/*browserSync({
		server: {
			baseDir: './'
		}
	});*/
	gulp.watch(watch_paths.scripts, ['scripts']);
	gulp.watch(watch_paths.styles, ['styles']);
});

gulp.task('default', ['watch']);
