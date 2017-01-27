/**
 * The function that will trigger the editor
 *
 * @param element : string|Object the dom element to trigger the editor
 * @param initialOutput : string the inital textarea content
 */
function triggerEditor(element, initialOutput) {

  Vue.use(VueResource);

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
}