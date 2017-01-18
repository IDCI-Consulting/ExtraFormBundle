var textareaOutput = {

  template:
    '<div>' +
      '<textarea id="form-editor" v-model="output" name="form[editor]" style="width: 100%; height: 150px;"></textarea>' +
      '<button @click.prevent="generateFields()">Generate the form from the json</button>' +
    '</div>'
  ,

  props: ['fields'],

  data: function() {
    return {
      output: {}
    }
  },

  watch: {
    fields: {
      handler: function(newFields) { this.output = this.generateOutput(newFields) },
      deep: true
    }
  },

  methods: {

    /**
     * Generate the form fields from the textarea output
     */
    generateFields: function() {
      var newFields = [];
      log(this.output);
      try {
        var output = JSON.parse(this.output);
        log(output);
        for (var field in output) {
          if (output.hasOwnProperty(field)) {
            var newField = {
              'name': field,
              'extra_form_type': output[field].extra_form_type,
              'options':  output[field].options,
              'constraints':  output[field].constraints
            };

            newFields.push(newField);
          }
        }

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
      var output = {};
      for (var i = 0, len = fields.length; i < len; i++) {
        var field = fields[i];
        var name = field['name'];
        output[name] = {};
        output[name]['extra_form_type'] = field['extra_form_type'];
        output[name]['options'] = field['options'];
        output[name]['constraints'] = field['constraints'];
      }

      return JSON.stringify(output, null, 4);
    }
  }
};