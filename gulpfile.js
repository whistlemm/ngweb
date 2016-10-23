var path = require('path')

var gulp = require('gulp'),
		cmdPack = require('gulp-cmd'),
		less = require('gulp-less')
		browserSync = require('browser-sync').create(),
		nodemon = require('gulp-nodemon'),
		del = require('del'),
		changed = require('gulp-changed');

var config = {
		dest: './public'
}

function clead() {
		return del.sync(['public']);
}

gulp.task('cmd', function(){
		var jsPath = config.dest + '/js'

		return gulp.src(path.join(__dirname, 'src/js/main.js'))
							 .pipe(cmdPack())
							 .pipe(changed(config.dest))
							 .pipe(gulp.dest(path.join(__dirname, jsPath)))
							 .pipe(browserSync.stream())
})

gulp.task('style', function() {
		var cssPath = config.dest + '/css';
		return gulp.src('./src/css/main.less')
							 .pipe(less())
							 .pipe(changed(cssPath))
							 .pipe(gulp.dest(cssPath))
							 .pipe(browserSync.stream())
})
gulp.task('moveStatic', function(){
	// return gulp.src(['src/**']).pipe(changed(config.dest)).pipe(gulp.dest(config.dest));
	gulp.src('src/vendor/font-awesome/fonts/**').pipe(changed(config.dest)).pipe(gulp.dest('./public/fonts'));
	gulp.src('src/vendor/**').pipe(changed(config.dest)).pipe(gulp.dest('public/vendor'));
	gulp.src('src/pages/**').pipe(changed(config.dest, {extensiton: 'html'})).pipe(gulp.dest('public/pages'));
	return gulp.src('src/images/**').pipe(changed(config.dest)).pipe(gulp.dest('public/images'));
});

gulp.task('default', ['moveStatic'], function(){
		gulp.start('style', 'cmd');
})

gulp.task('nodemon', function(){
		

	var stream = nodemon({
		script: 'web/bin/www',
		watch: ['web/'],
		ext: 'js jade'
	})

	browserSync.init({
		proxy: 'http://localhost:3000',
		port: 8080,
		online: true
	})
	stream.on('restart', function(){
		console.log(1);
		browserSync.reload('*.html');
	})
})

// 静态服务器
gulp.task('browserSync', ['default'], function(){
		gulp.watch('./src/**/*.less', ['css']);
		gulp.watch('./src/**/*.js', ['cmd']);
		gulp.watch(['src/**/*','!src/js/**/*.js', '!src/css/**/*.less'], ['moveStatic']);

		browserSync.watch('src/**/*.html').on('change', browserSync.reload)

		browserSync.init({
				proxy: "http://localhost:3000",
		})
})

gulp.task('server', ['browserSync'], function(){

		console.log('dev proxy start');
})

