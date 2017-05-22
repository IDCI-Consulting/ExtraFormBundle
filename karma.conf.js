// Karma configuration
// Generated on Fri May 05 2017 08:10:00 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'Resources/public/js/',

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'vendor/jquery-2.2.4.min.js',
      'vendor/codemirror.js',
      'vendor/codemirror-javascript-mode.js',
      'vendor/vue-prod.min.js',
      'vendor/vuex-2.1.2.js',
      'vendor/sortable.min.js',
      'vendor/vue-multiselect.min.js',
      'vendor/vue-draggable.min.js',
      'vendor/vue-resource-1.2.0.min.js',
      'vendor/utils.js',
      'editor/mixins/option.vue.js',
      'editor/mixins/jsonOption.vue.js',
      'editor/mixins/http.vue.js',
      'editor/mixins/rawModal.vue.js',
      'editor/mixins/raw.vue.js',
      'editor/mixins/icon.vue.js',
      'editor/store/getters.vue.js',
      'editor/store/actions.vue.js',
      'editor/store/mutations.vue.js',
      'editor/components/common/modal.vue.js',
      'editor/components/common/options/textarea.vue.js',
      'editor/components/common/options/choice.vue.js',
      'editor/components/common/options/text.vue.js',
      'editor/components/common/options/number.vue.js',
      'editor/components/common/options/integer.vue.js',
      'editor/components/common/options/checkbox.vue.js',
      'editor/components/editor-simple/types-selectbox.vue.js',
      'editor/components/editor-simple/new-field.vue.js',
      'editor/components/editor-simple/new-field-constraint.vue.js',
      'editor/components/editor-simple/field-options.vue.js',
      'editor/components/editor-simple/field-constraint-options.vue.js',
      'editor/components/editor-simple/field-constraints.vue.js',
      'editor/components/editor-simple/field.vue.js',
      'editor/components/editor-advanced/new-field-constraint.vue.js',
      'editor/components/editor-advanced/field-constraint-options.vue.js',
      'editor/components/editor-advanced/field-constraints.vue.js',
      'editor/components/editor-advanced/field-options.vue.js',
      'editor/components/editor-advanced/field.vue.js',
      'editor/components/editor-advanced/extra-form-fields.vue.js',
      'editor/components/editor-advanced/extra-form-fields-configuration.vue.js',
      'editor/components/editor-advanced/configured-extra-form-type.vue.js',
      'editor/components/editor-advanced/base-extra-form-type.vue.js',
      'editor/components/editor-advanced/extra-form-types.vue.js',
      'editor/components/editor-simple/editor.vue.js',
      'editor/components/editor-advanced/editor.vue.js',
      'editor/components/editor-raw.vue.js',
      'editor/app.js',
      'tests/**/*.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chromium', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
