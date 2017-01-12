Vue.use(VueResource);

var app = new Vue({

  el: '#editorApp',
  delimiters: ['${', '}'], // avoid conflicts with twig
  data: {
    extraFormTypes: {},
    selectedExtraFormType: '',
    fields: []
  },

  mounted: function() {
    this.getExtraFormTypes();
  },

  methods: {

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
      var field = {
        'name': 'field_'+this.generateUniqueId(),
        'extra_form_type': this.selectedExtraFormType,
        'options': {},
        'constraints': []
      };
      this.fields.push(field);
      this.$set(this, 'fields', this.fields);
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