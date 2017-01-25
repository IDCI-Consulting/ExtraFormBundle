var field = {

  template:
      '<div>' +
        '<label>Name : </label>' +
        '<input type="text" v-model="field.name" /> ' +
        '<types-selectbox v-model="field.extra_form_type" @input="updateType"/><br>' +
        '<field-options :fieldOptions="field.options" :type="field.extra_form_type"/>' +
        '<field-constraints :fieldConstraints="field.constraints"/> ' +
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
      this.$set(this.field, 'extra_form_type', type);
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
     * Add a new constraint to the field
     */
    addConstraint: function(newConstraint) {

      var constraintIsAlreadySet = function(constraint) {
        return constraint.extra_form_constraint == newConstraint.extra_form_constraint;
      };

      if (this.field.constraints.filter(constraintIsAlreadySet).length > 0) {
        console.error('The constraint '+ newConstraint.extra_form_constraint +' is already set');
      } else {
        this.field.constraints.push(newConstraint);
      }
    }

  }
};