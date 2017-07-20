'use strict';

var src = {};
src.styles = [
  'Resources/public/css/editor-simple.css',
  'Resources/public/css/editor-advanced.css',
  'Resources/public/css/editor-common.css',
  'Resources/public/css/multiselect.css'
];

var dist = {};
dist.styles = 'Resources/public/css';

var chmod          = require('gulp-chmod'),
  concat           = require('gulp-concat'),
  del              = require('del'),
  gulp             = require('gulp'),
  jshint           = require('gulp-jshint'),
  minifycss        = require('gulp-minify-css'),
  rename           = require('gulp-rename'),
  sass             = require('gulp-sass'),
  uglify           = require('gulp-uglify')
;

// Task to compile Sass files
gulp.task('styles', function() {
  gulp.src(src.styles)
    .pipe(sass({ errLogToConsole: true }))
    .pipe(minifycss({keepSpecialComments: 0}))
    .pipe(concat({ path: 'extra-form-editor.min.css'}))
    .pipe(chmod(775))
    .pipe(gulp.dest(dist.styles))
  ;
});
