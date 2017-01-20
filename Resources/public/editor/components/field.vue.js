var field = {

  template:
      '<div>' +
        '<label>Name : </label><input type="text" v-model="field.name" /><br>' +
        '<field-options :fieldOptions="field.options" :type="field.extra_form_type" @optionChanged="updateOption"/>' +
        '<field-constraints :fieldConstraints="field.constraints"/>' +
        '<new-field-constraint @created="addConstraint"/>' +
        '<button v-on:click.prevent="removeField(index)">Delete this field</button>' +
      '</div>'
  ,

  props: ['field', 'index'],

  components: {
    'field-options': fieldOptions,
    'new-field-constraint': newFieldConstraint,
    'field-constraints': fieldConstraints
  },

  methods: {

    /**
     * Update the option
     *
     * @param option
     */
    updateOption: function(option) {
      option.field_index = this.index;
      this.$emit('optionchanged', option);
    },

    /**
     * Remove a field
     *
     * @param event
     */
    removeField: function(index) {
      this.$emit('removed', index);
    },

    /**
     * Add a new constraint
     */
    addConstraint: function(constraint) {
      constraint.field_index = this.index;
      this.$emit('constraintadded', constraint);
    }
  }
};