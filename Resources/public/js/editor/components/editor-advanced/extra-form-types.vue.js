var extraFormTypes = {

  template:
    '<div>' +
      '<button @click="createField(type.formType)" :class="type.formType" type="button" v-for="type in types">{{ type.formType }}</button>' +
    '</div>'
  ,

  data: function () {
    return {
      types: []
    }
  },

  mounted: function() {
    this.getExtraFormTypes();
  },

  methods: {

    /**
     * Generate a unique id for the fields default names
     *
     * @returns string
     */
    generateUniqueId: function() {
      return Math.random().toString(36).substr(2, 9);
    },

    /**
     * Create a new field
     */
    createField: function(value) {
      var field = {
        'name': 'field_' + value + '_' + this.generateUniqueId(),
        'extra_form_type': value,
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
        })
      ;
    }
  }

};