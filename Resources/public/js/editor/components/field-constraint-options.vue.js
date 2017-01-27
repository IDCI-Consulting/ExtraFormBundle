var fieldConstraintOptions = {

  template:
    '<div class="field-constraint-options">' +
      '<label>Options : </label>' +
      '<component :is="option.component_name" v-for="(option, key) in constraint.extraFormOptions" :option="option" :name="key" :value="fieldConstraint.options[key]"  @changed="updateOption"/>' +
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
      this.$http.get('/extra-form-constraints.json')
        .then(
        function (response) {
          var constraints = response.body;
          this.constraint = constraints[fieldConstraint.extra_form_constraint];

          var options = this.constraint.extraFormOptions;
          for (var option in options) {
            if (options.hasOwnProperty(option)) {
              options[option]['component_name'] = 'option-' + options[option].extra_form_type;
            }
          }
        },
        function (response) {
          console.log(response.status + ' ' + response.statusText);
        }
      )
      ;
    }
  }
};