var fieldOptions = {

  template:
    '<div>' +
      '<component :is="option.component_name" v-for="(option, index) in options" :option="option" :field="field"></component>' +
    '</div>'
  ,

  props: ['field'],

  data: function () {
    return {
      options: []
    }
  },

  components: {
    'option-checkbox': checkboxOption,
    'option-textarea': textareaOption,
    'option-choice': choiceOption,
    'option-text': textOption
  },

  mounted: function() {
    this.getExtraFormTypeOptions(this.field.extra_form_type);
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