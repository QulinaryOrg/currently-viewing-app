'use strict'

const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');
const wait = require('gulp-wait');
const template = require('gulp-template');
const runSequence = require('run-sequence');
const moment = require('moment');
const btoa = require('btoa');

gulp.task('default', () => {
  // place code for your default task here
  console.log('default task! -- gulp');
});

gulp.task('echo-env', () => {
  // place code for your default task here
  console.log(process.env.NODE_ENV);
});

gulp.task('hang10', () => {
  console.log('Hangfire wait 10 secs ...');
  return gulp.src('./')
    .pipe(wait(10000));
});

gulp.task('env-dev', () => {
  return process.env.NODE_ENV = 'development';
});

gulp.task('env-stg', () => {
  return process.env.NODE_ENV = 'staging';
});

gulp.task('env-prd', () => {
  return process.env.NODE_ENV = 'production';
});

gulp.task('webpack-build', shell.task([
  'npm run webpack-build'
]));

gulp.task('bundle', () =>{
  del(['./public/'], {force: true}).then(() => {
    gulp.src(['./assets/**/*']).pipe(gulp.dest('./public/assets/'));
    gulp.src(['./style/**/*']).pipe(gulp.dest('./public/style/'));
    gulp.src(['./app.js']).pipe(gulp.dest('./public/'));
    gulp.src(['./favicon.ico']).pipe(gulp.dest('./public/'));
    gulp.src(['./LICENSE.md']).pipe(gulp.dest('./public/'));
    gulp.src(['./index.html'])
      // encode timestamp in base64 notation
      .pipe(template({ build: btoa(btoa(moment().unix())) }))
      .pipe(gulp.dest('./public/'));
  });
});

gulp.task('build-public', () => {
  runSequence(
    'webpack-build',
    'hang10',
    'bundle'
  );
});
