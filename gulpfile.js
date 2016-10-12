var path = require('path')

var gulp = require('gulp'),
    cmdPack = require('gulp-cmd'),
    less = require('gulp-less')
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon')

gulp.task('cmd', function(){
    return gulp.src(path.join(__dirname, 'src/js/main.js'))
               .pipe(cmdPack())
               .pipe(gulp.dest(path.join(__dirname, 'public/js')))
})

gulp.task('style', function() {
    return gulp.src('./src/css/main.less')
               .pipe(less())
               .pipe(gulp.dest('./public/css'))
})

gulp.task('moveVendor', function(){
    return gulp.src('src/vendor/**').pipe(gulp.dest('./public/vendor'));
})

gulp.task('movePages', function(){
    return gulp.src('src/pages/**').pipe(gulp.dest('./public/pages'));
})

gulp.task('moveImages', function(){
    return gulp.src('src/images/**').pipe(gulp.dest('./public/images'));
})

gulp.task('moveFonts', function(){
    return gulp.src('src/vendor/font-awesome/fonts/**').pipe(gulp.dest('./public/fonts'));
})

gulp.task('default', ['style', 'cmd', 'moveVendor', 'movePages', 'moveFonts', 'moveImages'], function(){
    console.log('default')
})

gulp.task('server', ['browserSync'], function(){
    nodemon({
        script: 'web/bin/www',
        ext: 'js jade',
        watch: ['web'],
    })
})

// 静态服务器
gulp.task('browserSync', ['default'], function(){
    browserSync.init({
        proxy: "http://localhost:9494",
        notify: false
    })

    gulp.watch('./src/css/**/*.less', ['style'])

    gulp.watch('./src/**/*', function(){
        gulp.start('default');
        browserSync.reload();
    })
})

// 代理

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });

