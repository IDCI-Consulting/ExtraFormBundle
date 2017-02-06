var editorAdvancedFieldConstraints = {

  template:
    '<div>' +
      '<label>Constraints : </label>' +
      '<div class="field-constraint" v-for="(constraint, index) in fieldConstraints">' +
        '<button @click.prevent="removeConstraint(index)" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' +
        '<strong>{{ constraint.extra_form_constraint }}</strong> ' +
        '<field-constraint-options :fieldConstraint="constraint" :index="index" @optionChanged="updateOption"/>' +
      '</div>' +
    '</div>'
  ,

  props: ['fieldConstraints'],

  components: {
    'field-constraint-options': editorAdvancedFieldConstraintOptions
  },

  methods: {
    updateOption: function(option) {
      this.$set(this.fieldConstraints.options, option.name, option.value);
    },

    removeConstraint: function(index) {
      this.fieldConstraints.splice(index, 1);
    }
  }
};