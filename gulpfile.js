'use strict';

var src = {};
src.styles = [
  'Resources/public/css/editor-common.css',
  'Resources/public/css/editor-simple.css',
  'Resources/public/css/editor-advanced.css',
  'Resources/public/css/bootstrap.min.css',
  'Resources/public/css/bootstrap-theme.min.css'
];
src.scripts = [
  //'Resources/public/js/assets/vue-dev.js',
  'Resources/public/js/assets/vue-prod.min.js',
  'Resources/public/js/assets/vuex-2.1.2.js',
  'Resources/public/js/assets/sortable.min.js',
  'Resources/public/js/assets/vue-multiselect.min.js',
  'Resources/public/js/assets/vue-draggable.min.js',
  'Resources/public/js/assets/jquery-1.11.3.min.js',
  'Resources/public/js/assets/bootstrap.min.js',
  'Resources/public/js/assets/vue-resource-1.2.0.min.js',
  'Resources/public/js/assets/utils.js',
  'Resources/public/js/editor/mixins/option.js',
  'Resources/public/js/editor/mixins/http.js',
  'Resources/public/js/editor/mixins/icon.js',
  'Resources/public/js/editor/mixins/fields.js',
  'Resources/public/js/editor/components/modal.vue.js',
  'Resources/public/js/editor/components/common/options/textarea.vue.js',
  'Resources/public/js/editor/components/common/options/choice.vue.js',
  'Resources/public/js/editor/components/common/options/text.vue.js',
  'Resources/public/js/editor/components/common/options/number.vue.js',
  'Resources/public/js/editor/components/common/options/integer.vue.js',
  'Resources/public/js/editor/components/common/options/checkbox.vue.js',
  'Resources/public/js/editor/components/editor-simple/types-selectbox.vue.js',
  'Resources/public/js/editor/components/editor-simple/new-field.vue.js',
  'Resources/public/js/editor/components/editor-simple/new-field-constraint.vue.js',
  'Resources/public/js/editor/components/editor-simple/field-options.vue.js',
  'Resources/public/js/editor/components/editor-simple/field-constraint-options.vue.js',
  'Resources/public/js/editor/components/editor-simple/field-constraints.vue.js',
  'Resources/public/js/editor/components/editor-simple/field.vue.js',
  'Resources/public/js/editor/components/editor-advanced/new-field-constraint.vue.js',
  'Resources/public/js/editor/components/editor-advanced/field-constraint-options.vue.js',
  'Resources/public/js/editor/components/editor-advanced/field-constraints.vue.js',
  'Resources/public/js/editor/components/editor-advanced/field-options.vue.js',
  'Resources/public/js/editor/components/editor-advanced/field.vue.js',
  'Resources/public/js/editor/components/editor-advanced/extra-form-fields.vue.js',
  'Resources/public/js/editor/components/editor-advanced/extra-form-fields-configuration.vue.js',
  'Resources/public/js/editor/components/editor-advanced/configured-extra-form-type.vue.js',
  'Resources/public/js/editor/components/editor-advanced/basic-extra-form-type.vue.js',
  'Resources/public/js/editor/components/editor-advanced/extra-form-types.vue.js',
  'Resources/public/js/editor/components/editor-simple/editor.vue.js',
  'Resources/public/js/editor/components/editor-advanced/editor.vue.js',
  'Resources/public/js/editor/components/editor-raw.vue.js',
  'Resources/public/js/editor/app.js',
  'Resources/public/js/editor/load-editor.js'
];

var dist = {};
dist.styles = 'Resources/public/css';
dist.scripts = 'Resources/public/js';

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

// Task to compile Sass files
gulp.task('scripts', function() {
  gulp.src(src.scripts)
    .pipe(uglify())
    .pipe(concat({ path: 'editor.min.js'}))
    .pipe(chmod(775))
    .pipe(gulp.dest(dist.scripts))
  ;
});
