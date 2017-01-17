Vue.use(VueResource);

function log(message) {
  console.log(JSON.stringify(message, null, 4));
}

var app = new Vue({

  el: '#editorApp',
  delimiters: ['${', '}'], // avoid conflicts with twig
  data: {
    extraFormTypes: {},
    selectedExtraFormType: '',
    htmlOptions: {},
    fields: [],
    output: {}
  },

  mounted: function() {
    this.getExtraFormTypes();
  },

  watch: {
    fields: {
      handler: function(newFields) { this.generateOutput(newFields) },
      deep: true
    }
  },

  methods: {

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

      this.$set(this, 'output', JSON.stringify(output, null, 4));
    },

    /**
     * Generate the form fields from the taxtarea output
     * @param event
     */
    generateForm: function(event) {
      event.preventDefault();
      var newFields = [];

      try {
        var output = JSON.parse(this.output);
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

        this.$set(this, 'fields', newFields);
      } catch (e) {
        console.error('Json parsing error');
      }
    },

    /**
     * Get the form type options
     * @param type
     */
    getExtraFormTypeOptions: function(type) {
      this.$http.get('/extra-form-types/'+ type +'/options.html')
        .then(
          function(response) {
            //console.log(options);
            //options = options.replace(/name\=\"/g, 'v-model="fields['+this.type+'].options');
            this.$set(this.htmlOptions, type, response.body);
          },
          function (response) {
            console.log(response.status + ' ' + response.statusText);
          }
        )
      ;
    },

    /**
     * Get the form types
     */
    getExtraFormTypes: function() {
      this.$http
        .get('/extra-form-types.json')
        .then(
        function(response) {
          return response.json();
        },
        function (response) {
          console.log(response.status + ' ' + response.statusText);
        })
        .then(function (jsonTypes) {
          this.$set(this, 'extraFormTypes', jsonTypes);
          var firstFormTypeName = Object.keys(jsonTypes)[0];
          this.$set(this, 'selectedExtraFormType', firstFormTypeName);
        })
      ;
    },

    /**
     * Add a new field
     *
     * @param event
     */
    addField: function(event) {
      event.preventDefault();
      this.getExtraFormTypeOptions(this.selectedExtraFormType);

      var field = {
        'name': 'field_' + this.selectedExtraFormType + '_' + this.generateUniqueId(),
        'extra_form_type': this.selectedExtraFormType,
        'options': {},
        'constraints': []
      };
      this.fields.push(field);
    },

    /**
     * Remove a field
     *
     * @param event
     */
    removeField: function(event, index) {
      event.preventDefault();
      this.fields.splice(index, 1);
    },

    /**
     * Generate a unique id for the fields default names
     *
     * @returns string
     */
    generateUniqueId: function() {
      return Math.random().toString(36).substr(2, 9);
    }
  }

});