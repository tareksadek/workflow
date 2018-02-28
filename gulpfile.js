var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var SOURCEPATHS = {
		sassSource: 'src/scss/*.scss'
}

var APPPATHS = {
		root: 'app/',
		css: 'app/css',
		js: 'app/js'
}

gulp.task('sass', function(){
	return gulp.src(SOURCEPATHS.sassSource)
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

gulp.task('watch', ['serve','sass'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
});

gulp.task('default', ['watch']);