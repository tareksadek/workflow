var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var SOURCEPATHS = {
		sassSource: 'src/scss/*.scss',
		htmlSource: 'src/*.html'
}

var APPPATHS = {
		root: 'app/',
		css: 'app/css',
		js: 'app/js'
}

gulp.task('sass', function(){
	return gulp.src(SOURCEPATHS.sassSource)
	.pipe(autoprefixer('last 2 versions'))
	.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest(APPPATHS.css));
});

gulp.task('serve',['sass'],function(){
	browserSync.init([APPPATHS.css + '/*.css', APPPATHS.root + '/*.html', APPPATHS.js + '/*.js'], {
		server: {
			baseDir: APPPATHS.root
		}
	})
});

gulp.task('copy',function(){
	gulp.src(SOURCEPATHS.htmlSource)
	.pipe(gulp.dest(APPPATHS.root));
});

gulp.task('watch', ['serve','sass','copy'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
});

gulp.task('default', ['watch']);