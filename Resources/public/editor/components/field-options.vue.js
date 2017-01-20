var fieldOptions = {

  template:
    '<div class="field-options">' +
      '<label>Options : </label>' +
      '<component :is="option.component_name" v-for="(option, key) in options" :option="option" :name="key" :value="fieldOptions[key]" @changed="updateOption"/>' +
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
     *
     * @param type
     */
    getExtraFormTypeOptions: function(type) {
      this.$http.get('/extra-form-types/'+ type +'/options.json')
        .then(
        function(response) {
          var options = response.body;
          for (var option in options) {
            if (options.hasOwnProperty(option)) {
              options[option]['component_name'] = 'option-' + options[option].extra_form_type;
            }
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