var fieldOptions = {

  template:
    '<div class="field-options">' +
      '<label>Options : </label>' +
      '<component v-if="option.component_name !== \'editor\'" :is="option.component_name" v-for="(option, key) in options" :option="option" :name="key" :value="fieldOptions[key]" @changed="updateOption"></component>' +
      '<editor v-for="(option, key) in options" v-if="option.component_name === \'editor\'" :fields="fieldOptions[key]"></editor>' +
    '</div>'
  ,

  props: ['type', 'fieldOptions'],

  data: function () {
    return {
      options: {}
    }
  },

  components: {
    'option-checkbox': checkboxOption,
    'option-textarea': textareaOption,
    'option-choice': choiceOption,
    'option-text': textOption,
    'option-number': numberOption,
    'option-integer': integerOption
  },

  mounted: function() {
    this.getExtraFormTypeOptions(this.type);
  },

  watch: {
    type: {
      handler: function(newType) {
        this.getExtraFormTypeOptions(newType);
      }
    },
    options: {
      handler: function (newOptions) {
        this.deleteOldOptions(newOptions);
      }
    }
  },

  methods: {

    /**
     * Delete the old options from the fields when those options does not exist for a new type
     */
    deleteOldOptions: function(newOptions) {
      if (Object.keys(newOptions).length > 0) {
        for (fieldOption in this.fieldOptions) {
          // if a previous option (which was setted on a field) is not in the options anymore, we remove this option
          if (!(fieldOption in newOptions)) {
            this.$delete(this.fieldOptions, fieldOption);
          }
        }
      }
    },

    updateOption: function(option) {
      this.$set(this.fieldOptions, option.name, option.value);
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
              if (option === 'configuration') {
                options[option]['component_name'] = 'editor';
                if (typeof this.fieldOptions[option] === 'undefined') {
                  // initialize the configuration fields for the first time
                  this.$set(this.fieldOptions, option, []);
                }
              } else {
                options[option]['component_name'] = 'option-' + options[option].extra_form_type;
              }
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