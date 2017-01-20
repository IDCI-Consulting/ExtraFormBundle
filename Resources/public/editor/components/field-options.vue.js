var fieldOptions = {

  template:
    '<div>' +
      '<component :is="option.component_name" v-for="(option, index) in options" :option="option" :value="fieldOptions[option.name]" @changed="updateOption"></component>' +
    '</div>'
  ,

  props: ['type', 'fieldOptions'],

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
    this.getExtraFormTypeOptions(this.type);
  },

  methods: {

    updateOption: function(option) {
      this.$emit('optionChanged', option);
    },

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