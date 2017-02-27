/* exported editorSimpleFieldConstraints */
var editorSimpleFieldConstraints = {

  template:
    '<div>' +
      '<label>Constraints : </label>' +
      '<div v-for="(constraint, index) in fieldConstraints">' +
        '<span>{{ constraint.extra_form_constraint }}</span> ' +
        '<button v-on:click.prevent="removeConstraint(index)">Delete this constraint</button>' +
        '<field-constraint-options :fieldConstraint="constraint" :index="index" @optionChanged="updateOption"/>' +
      '</div>' +
    '</div>',

  props: ['fieldConstraints'],

  components: {

    /* global editorSimpleFieldConstraintOptions */
    'field-constraint-options': editorSimpleFieldConstraintOptions
  },

  methods: {
    updateOption: function (option) {
      this.$set(this.fieldConstraints.options, option.name, option.value);
    },

    removeConstraint: function (index) {
      this.fieldConstraints.splice(index, 1);
    }
  }
};
