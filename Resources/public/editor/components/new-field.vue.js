var newField = {

  delimiters: ['${', '}'],

  template:
    '<div>' +
      '<select v-model="selectedExtraFormType" id="newExtraformField">' +
        '<option v-for="type in types" :value="type.formType">' +
          '${ type.formType }' +
        '</option>' +
      '</select>' +
      '<button @click.prevent="createField">New field</button>' +
    '</div>'
  ,

  data: function () {
    return {
      selectedExtraFormType: 'initial',
      types: []
    }
  },

  mounted: function() {
    this.getExtraFormTypes();
  },

  methods: {

    /**
     * Create a new field
     *
     * @param event
     */
    createField: function() {
      var field = {
        'name': 'field_' + this.selectedExtraFormType + '_' + this.generateUniqueId(),
        'extra_form_type': this.selectedExtraFormType,
        'options': {},
        'constraints': []
      };

      this.$emit('created', field);
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
          this.types = jsonTypes;
          this.selectedExtraFormType = Object.keys(this.types)[0];
        })
      ;
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
};