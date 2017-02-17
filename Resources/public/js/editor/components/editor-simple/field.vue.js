var editorSimpleField = {

  template:
      '<div>' +
          '<label>Name : </label>' +
          '<input type="text" v-model="field.name" /> ' +
          '<types-selectbox v-model="field.extra_form_type" @input="updateType"/><i class="handle"></i><br>' +
          '<field-options class="field-options" :fieldOptions="field.options" :type="field.extra_form_type"/>' +
          '<field-constraints class="field-constraints" :fieldConstraints="field.constraints"/> ' +
          '<new-field-constraint @created="addConstraint"/><br>' +
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
    'field-options': editorSimpleFieldOptions,
    'new-field-constraint': editorSimpleNewFieldConstraint,
    'field-constraints': editorSimpleFieldConstraints,
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
     * @param index
     */
    removeField: function(index) {
      this.$emit('removed', index);
    },

    /**
     * Add a new constraint to the field
     */
    addConstraint: function(newConstraint) {
        this.field.constraints.push(newConstraint);
    }

  }

};