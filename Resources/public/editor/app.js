Vue.use(VueResource);

function log(message) {
  console.log(JSON.stringify(message, null, 4));
}

new Vue({

  el: '#editorApp',
  data: {
    fields: [],
    // default values
    configuration: {
      enableTextareaOutput: true
    }
  },

  /**
   * Override the configuration
   */
  created: function() {
    var rootElement = document.querySelector('div#editorApp[data-configuration-variable]');
    if (rootElement !== null) {
      var configurationVariableName = rootElement.getAttribute('data-configuration-variable');
      var extraFormEditorConfiguration = window[configurationVariableName];
      if (typeof extraFormEditorConfiguration !== 'undefined') {
        for (var parameter in extraFormEditorConfiguration) {
          this.$set(this.configuration, parameter, extraFormEditorConfiguration[parameter]);
        }
      }
    }
  },

  components: {
    'textarea-output': textareaOutput
  },

  methods: {

    /**
     * Update the fields
     *
     * @param fields
     */
    updateFields: function (fields) {
      this.$set(this, 'fields', fields);
    }
  }
});
