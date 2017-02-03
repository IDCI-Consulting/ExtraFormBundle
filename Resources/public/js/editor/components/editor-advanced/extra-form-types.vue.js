var extraFormTypes = {

  template:
    '<div>' +
      '<button :class="type.formType" type="button" v-for="type in types">{{ type.formType }}</button>' +
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