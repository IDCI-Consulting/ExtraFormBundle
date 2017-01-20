var fieldConstraintOptions = {

  template:
    '<div class="field-constraint-options">' +
      '<label>Options :</label>' +
      '<component :is="option.component_name" v-for="(option, key) in constraint.extraFormOptions" :option="option" :name="key" :value="fieldConstraint.options[key]"/>' +
    '</div>'
  ,
  props: ['fieldConstraint'],

  data: function () {
    return {
      'constraint': {}
    }
  },

  components: {
    'option-checkbox': checkboxOption,
    'option-textarea': textareaOption,
    'option-choice': choiceOption,
    'option-text': textOption
  },

  mounted: function() {
    this.getExtraFormConstraintOption(this.fieldConstraint);
  },

  methods: {

    /**
     * Get the extra form constraints
     */
    getExtraFormConstraintOption: function (fieldConstraint) {
      log(fieldConstraint);
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