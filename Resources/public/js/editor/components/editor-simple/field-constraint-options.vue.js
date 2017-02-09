var editorSimpleFieldConstraintOptions = {

  template:
    '<div class="field-constraint-options">' +
      '<label>Options : </label>' +
      '<component :is="option.component_name" v-for="(option, key) in constraint.extra_form_options" :option="option" :name="key" :value="fieldConstraint.options[key]"  @changed="updateOption"/>' +
    '</div>'
  ,
  props: ['fieldConstraint', 'index'],

  data: function () {
    return {
      'constraint': {}
    }
  },

  components: {
    'option-checkbox': checkboxOption,
    'option-textarea': textareaOption,
    'option-choice': choiceOption,
    'option-text': textOption,
    'option-number': numberOption
  },

  mounted: function() {
    this.getExtraFormConstraintOption(this.fieldConstraint);
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
     * Get the extra form constraints
     */
    getExtraFormConstraintOption: function (fieldConstraint) {
      this.$http.get(this.$store.getters.extraFormConstraintsApiUrl)
        .then(
          function (response) {
            return response.json();
          },
          function (response) {
            console.log(response.status + ' ' + response.statusText);
          }
        )
        .then(function (json) {
          var constraints = json;
          this.constraint = constraints[fieldConstraint.extra_form_constraint];

          var options = this.constraint.extra_form_options;
          for (var option in options) {
            if (options.hasOwnProperty(option)) {
              options[option]['component_name'] = 'option-' + options[option].extra_form_type;
            }
          }
        })
      ;
    }
  }
};