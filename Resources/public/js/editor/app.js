/**
 * The function that will trigger the editor
 *
 * @param element : string|Object the dom element to trigger the editor
 * @param initialOutput : string the inital textarea content
 */
function triggerEditor(element, initialOutput, configuration) {

  Vue.use(VueResource);

  function log(message) {
    console.log(JSON.stringify(message, null, 4));
  }

  new Vue({

    el: element,
    data: {
      fields: [],
      initialOutput: initialOutput,
      // default values
      configuration: {
        enableTextareaOutput: true
      }
    },

    /**
     * Override the configuration
     */
    created: function() {
      var rootElement = document.querySelector('div.editorApp[data-configuration-variable]');
      if (rootElement !== null) {
        var configurationVariableName = rootElement.getAttribute('data-configuration-variable');
        var configuration = window[configurationVariableName];
        if (typeof configuration !== 'undefined') {
          for (var parameter in configuration) {
            this.$set(this.configuration, parameter, configuration[parameter]);
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
};