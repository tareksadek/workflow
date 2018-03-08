var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var injectPartials = require('gulp-inject-partials');

var SOURCEPATHS = {
		sassSource       : 'src/scss/*.scss',
		htmlSource       : 'src/*.html',
		patialSource     : 'src/partial/**.html',
		jsSource         : 'src/js/*.js',
		fontawesomeSource: 'node_modules/font-awesome/fonts/**',
		imgSource        : 'src/img/**'
}

var APPPATHS = {
		root  : 'app/',
		css   : 'app/css',
		js    : 'app/js',
		fonts : 'app/fonts',
		images: 'app/img'
}

gulp.task('images', function(){
	return gulp.src(SOURCEPATHS.imgSource)
	.pipe(newer(APPPATHS.images))
	.pipe(imagemin())
	.pipe(gulp.dest(APPPATHS.images));
});

gulp.task('sass', function(){
	var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
	var sassFiles;
	
	sassFiles = gulp.src(SOURCEPATHS.sassSource)
	.pipe(autoprefixer('last 2 versions'))
	.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
	
	return merge(bootstrapCSS, sassFiles)
	.pipe(concat('app.css'))
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

/*gulp.task('copy', ['clean-html'], function(){
	gulp.src(SOURCEPATHS.htmlSource)
	.pipe(gulp.dest(APPPATHS.root));
});*/

gulp.task('html', function(){
	return gulp.src(SOURCEPATHS.htmlSource)
	.pipe(injectPartials())
	.pipe(gulp.dest(APPPATHS.root))
});

gulp.task('javascript', ['clean-javascript'], function(){
	gulp.src(SOURCEPATHS.jsSource)
	.pipe(concat('main.js'))
	.pipe(browserify())
	.pipe(gulp.dest(APPPATHS.js));
});

gulp.task('clean-javascript', function(){
	return gulp.src(APPPATHS.js + '/*.js', {read:false, force: true})
	.pipe(clean());
});

gulp.task('fontawesome', function(){
	gulp.src(SOURCEPATHS.fontawesomeSource)
	.pipe(gulp.dest(APPPATHS.fonts));
});

gulp.task('watch', ['serve','sass','html', 'clean-html', 'javascript', 'clean-javascript', 'fontawesome', 'images'], function(){
	gulp.watch([SOURCEPATHS.sassSource], ['sass']);
	//gulp.watch([SOURCEPATHS.htmlSource], ['copy']);
	gulp.watch([SOURCEPATHS.htmlSource, SOURCEPATHS.patialSource], ['htm']);
	gulp.watch([SOURCEPATHS.jsSource], ['javascript']);
});

gulp.task('default', ['watch']);