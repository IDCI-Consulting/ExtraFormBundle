/* exported editorSimpleFieldOptions */
var editorSimpleFieldOptions = {

  template:
    '<div>' +
        '<label>Options : </label>' +
        '<component ' +
          'v-if="option.component_name !== \'editor\'" ' +
          ':is="option.component_name" ' +
          'v-for="(option, key) in options" ' +
          ':option="option" ' +
          ':name="key" ' +
          ':value="fieldOptions[key]" ' +
          '@changed="updateOption">' +
        '</component>' +
        '<editor-simple v-for="(option, key) in options" ' +
          'v-if="option.component_name === \'editor\'" ' +
          ':fields="fieldOptions[key]">' +
        '</editor-simple>' +
    '</div>',

  props: ['type', 'fieldOptions'],

  data: function () {
    return {
      options: {}
    };
  },

  components: {

    /* global checkboxOption */
    'option-checkbox': checkboxOption,

    /* global textareaOption */
    'option-textarea': textareaOption,

    /* global choiceOption */
    'option-choice': choiceOption,

    /* global textOption */
    'option-text': textOption,

    /* global numberOption */
    'option-number': numberOption,

    /* global integerOption */
    'option-integer': integerOption
  },

  /* global httpMixin  */
  mixins: [httpMixin],

  created: function () {
    this.getExtraFormTypeOptions(this.type);
  },

  watch: {
    type: {
      handler: function (newType) {
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
    deleteOldOptions: function (newOptions) {
      if (Object.keys(newOptions).length > 0) {
        for (var fieldOption in this.fieldOptions) {
          // If a previous option (which was set on a field) is not in the options anymore, we remove this option
          if (!(fieldOption in newOptions)) {
            this.$delete(this.fieldOptions, fieldOption);
          }
        }
      }
    },

    updateOption: function (option) {
      this.$set(this.fieldOptions, option.name, option.value);
    },

    /**
     * Get the form type options
     *
     * @param type
     */
    getExtraFormTypeOptions: function (type) {
      var url = this.$store.getters.getExtraFormTypeOptionsApiUrl(type);
      var self = this;

      this.handleGetRequest(url, function (options) {
        for (var option in options) {
          if (options.hasOwnProperty(option)) {
            if ('configuration' === option) {
              options[option].component_name = 'editor';
              if ('undefined' === typeof self.fieldOptions[option]) {
                // Initialize the configuration fields for the first time
                self.$set(self.fieldOptions, option, []);
              }
            } else {
              options[option].component_name = 'option-' + options[option].extra_form_type;
            }
          }
        }

        self.options = options;
      });
    }

  }

};
