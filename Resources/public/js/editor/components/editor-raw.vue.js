Vue.component('editor-raw', {

  template:
    '<div>' +
        '<textarea :id="textarea.id" v-model="output" :name="textarea.name" style="width: 100%; height: 300px;"></textarea>' +
        '<button class="close-modal" @click.prevent="generateFields">Fill the visual mode form fields from this json</button>' +
    '</div>'
  ,

  props: ['fields'],

  data: function() {
    return {
      output: '',
      textarea: this.$store.state.formProperties
    }
  },

  mixins: [fieldsMixins],

  created: function() {
    try {
      // If the textarea is empty, do not attempt to generate fields
      if (this.textarea.value !== '') {
        this.output = this.textarea.value;
        this.generateFields();
      }
    } catch (e) {
      console.error('Json parsing error');
    }
  },

  watch: {
    fields: {
      handler: function(newFields) { this.output = this.generateOutput(newFields); },
      deep: true
    }
  },

  methods: {

    /**
     * Generate the form fields from the textarea output
     */
    generateFields: function() {
      var newFields = [];
      try {
        var output = JSON.parse(this.output);
        newFields = this.createFieldsRecursively(output);
        this.$emit('generated', newFields);
      } catch (e) {
        console.error('Json parsing error');
      }
    },

    /**
     * Generate the output (the json for the textarea)
     *
     * @param fields
     */
    generateOutput: function(fields) {
      var output = this.createOutputRecursively(fields);

      return JSON.stringify(output, null, 4);
    },

    /**
     * Create the output recursively for each configuration option
     *
     * @param fields
     */
    createOutputRecursively: function(fields) {
      // We need to clone the fields, else changes to the output are reflected on the fields
      var cloneFields = JSON.parse(JSON.stringify(fields));

      var output = {};
      for (var i = 0, len = cloneFields.length; i < len; i++) {
        var field = cloneFields[i];
        var name = field.name;
        output[name] = {};
        output[name]['extra_form_type'] = field.extra_form_type;
        output[name]['constraints'] = field.constraints;
        output[name]['options'] = field.options;
        if (typeof field.options.configuration !== 'undefined') {
          if (field.options.configuration.length === 0) {
            // Hide the configuration in the output key if it's empty
            delete output[name]['options'].configuration;
          } else {
            // Each time a configuration option is found and if it's not empty, recursively create the output for this configuration
            output[name]['options'].configuration = this.createOutputRecursively(output[name]['options'].configuration);
          }
          output[name]['constraints'] = field.constraints;
        }
      }

      // sort the keys

      return output;
    }

  }
});