var fieldConstraints = {

  template:
    '<div class="field-constraints">' +
      '<label>Constraints : </label>' +
      '<div v-for="(constraint, index) in fieldConstraints">' +
        '{{ constraint.extra_form_constraint }}' +
        '<field-constraint-options :fieldConstraint="constraint" :index="index" @optionChanged="updateOption"/>' +
      '</div>' +
    '</div>'
  ,

  props: ['fieldConstraints'],

  components: {
    'field-constraint-options': fieldConstraintOptions
  },

  methods: {
    updateOption: function(option) {
      this.$emit('constraintOptionChanged', option);
    }
  }
};