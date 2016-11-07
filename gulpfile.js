var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate')


gulp.task('gen-assets', function() {
  	gulp.src(['taro/public/stylesheets/*.css'])
    	.pipe(minifyCSS())
    	.pipe(concat('style.min.css'))
    	.pipe(gulp.dest('taro/public/dist/css'))

    return gulp.src([
    		'taro/public/javascripts/utils.js',
    		'taro/public/javascripts/taro_app.js',
    		'taro/public/javascripts/config.js',
    		'taro/public/javascripts/factories/socket_factory.js',
    		'taro/public/javascripts/factories/profile_factory.js',
    		'taro/public/javascripts/factories/access_factory.js',
    		'taro/public/javascripts/services/auth_service.js',
    		'taro/public/javascripts/services/post_service.js',
    		'taro/public/javascripts/controllers/header_controller.js',
    		'taro/public/javascripts/controllers/login_controller.js',
    		'taro/public/javascripts/controllers/main_controller.js',
    		'taro/public/javascripts/controllers/register_controller.js'
    	])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
    	.pipe(uglify())
    	.pipe(gulp.dest('taro/public/dist/js'))

});