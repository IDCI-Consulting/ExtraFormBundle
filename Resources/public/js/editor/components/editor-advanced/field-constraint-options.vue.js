var editorAdvancedFieldConstraintOptions = {

  template:
      '<div class="field-constraint-options">' +
          '<a role="button" data-toggle="collapse" :href="\'#\' + id">Options<span class="toggle"></span></a>' +
          '<div :id="id" class="panel-collapse collapse" role="tabpanel" aria-expanded="false" :aria-controls="id">' +
                '<component :is="option.component_name" v-for="(option, key) in constraint.extra_form_options" :option="option" :name="key" :value="fieldConstraint.options[key]"  @changed="updateOption"/>' +
          '</div>' +
      '</div>'
  ,

  props: ['fieldConstraint', 'index'],

  data: function () {
    return {
      'constraint': {}
    }
  },

  computed: {
    id: function() {
      return 'constraint_' + generateUniqueId();
    }
  },

  watch: {
    fieldConstraint: {
      handler: function(fieldConstraint) {
        this.setConstraintOptions(fieldConstraint);
      }
    }
  },

  components: {
    'option-checkbox': checkboxOption,
    'option-textarea': textareaOption,
    'option-choice': choiceOption,
    'option-text': textOption,
    'option-number': numberOption
  },

  mixins: [httpMixin],

  created: function() {
    this.setConstraintOptions(this.fieldConstraint);
  },

  methods: {

    /**
     * Update an option on the constraint
     *
     * @param option
     */
    updateOption: function(option) {
      option.constraint_index = this.index;
      this.$set(
        this.fieldConstraint.options,
        option.name,
        option.value
      );
    },

    /**
     * Set the constraint options
     */
    setConstraintOptions: function(fieldConstraint) {
      var url = this.$store.getters.extraFormConstraintsApiUrl,
          self = this
      ;

      this.handleGetRequest(url, function (response) {

        self.constraint = response[fieldConstraint.extra_form_constraint];

        var options = self.constraint.extra_form_options;
        for (var option in options) {
          if (options.hasOwnProperty(option)) {
            options[option]['component_name'] = 'option-' + options[option].extra_form_type;
          }
        }
      });
    }
  }
};