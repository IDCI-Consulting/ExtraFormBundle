var field = {

  template:
      '<div>' +
        '<label>Name : </label>' +
        '<input type="text" v-model="field.name" /> ' +
        '<types-selectbox v-model="field.extra_form_type" @input="updateType"/><br>' +
        '<field-options :fieldOptions="field.options" :type="field.extra_form_type" @optionChanged="updateOption"/>' +
        '<field-constraints :fieldConstraints="field.constraints" @constraintOptionChanged="updateConstraintOption"/> ' +
        '<new-field-constraint @created="addConstraint"/>' +
        '<button v-on:click.prevent="removeField(index)">Delete this field</button>' +
      '</div>'
  ,

  data: function () {
    return {
      selectedExtraFormType: this.field.extra_form_type
    }
  },

  props: ['field', 'index'],

  components: {
    'field-options': fieldOptions,
    'new-field-constraint': newFieldConstraint,
    'field-constraints': fieldConstraints,
    'types-selectbox': typesSelectbox
  },

  methods: {

    /**
     * Update the field type
     *
     * @param type
     */
    updateType: function(type) {
      type = {
        'value': type,
        'field_index': this.index
      };
      this.$emit('typechanged', type);
    },

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
     * Update the constraint option
     *
     * @param option
     */
    updateConstraintOption: function(option) {
      option.field_index = this.index;
      this.$emit('constraintoptionchanged', option);
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