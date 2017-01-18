var fieldOptions = {

  template:
    '<div>' +
      '<component :is="option.component_name" v-for=\'(option, index) in options\'>{{ option.extra_form_type }}</component>' +
    '</div>'
  ,

  props: ['type'],

  data: function () {
    return {
      options: []
    }
  },

  mounted: function() {
    this.getExtraFormTypeOptions(this.type);
  },

  methods: {
    /**
    * Get the form type options
    * @param type
    */
    getExtraFormTypeOptions: function(type) {
      this.$http.get('/extra-form-types/'+ type +'/options.json')
        .then(
        function(response) {
          var options = response.body;
          for (var i = 0, len = options.length; i < len; i++) {
            options[i]['component_name'] = 'option-' + options[i]['extra_form_type'];
          }
          this.options = options;
        },
        function (response) {
          console.log(response.status + ' ' + response.statusText);
        }
      )
      ;
    }
  }
};