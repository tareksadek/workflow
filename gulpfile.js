var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

var SOURCEPATHS = {
		sassSource: 'src/scss/*.scss',
		htmlSource: 'src/*.html',
		jsSource : 'src/js/*.js'
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

gulp.task('clean-html',function(){
	return gulp.src(APPPATHS.root + '/*.html', {read:false,force:true})
	.pipe(clean());
});

gulp.task('copy', ['clean-html'], function(){
	gulp.src(SOURCEPATHS.htmlSource)
	.pipe(gulp.dest(APPPATHS.root));
});

gulp.task('javascript', ['clean-javascript'], function(){
	gulp.src(SOURCEPATHS.jsSource)
	.pipe(gulp.dest(APPPATHS.js));
});

gulp.task('clean-javascript', function(){
	return gulp.src(APPPATHS.js + '/*.js', {read:false, force: true})
	.pipe(clean());
});

gulp.task('watch', ['serve','sass','copy', 'clean-html', 'javascript', 'clean-javascript'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
	gulp.watch([SOURCEPATHS.jsSource], ['javascript']);
});

gulp.task('default', ['watch']);