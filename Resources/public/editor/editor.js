Vue.use(VueResource);

function log(message) {
  console.log(JSON.stringify(message, null, 4));
}

var app = new Vue({

  el: '#editorApp',
  delimiters: ['${', '}'], // avoid conflicts with twig
  data: {
    fields: []
  },

  components: {
    'new-field': newField,
    'textarea-output': textareaOutput,
    'field': field
  },

  methods: {

    /**
     * Update a field option
     *
     * @param fieldOption
     */
    updateOption: function(option) {
      this.$set(
        this.fields[option.field_index]['options'],
        option.name,
        option.value
      );
    },

    /**
     * Update the fields
     *
     * @param fields
     */
    updateFields: function(fields) {
      this.$set(this, 'fields', fields);
    },

    /**
     * Add a new field
     *
     * @param event
     */
    addField: function(field) {
      // this.getExtraFormTypeOptions(this.selectedExtraFormType);
      this.fields.push(field);
    },

    /**
     * Add a new cosntraint to the field
     */
    addConstraint: function(newConstraint) {

      var constraintIsAlreadySet = function(constraint) {
        return constraint.extra_form_constraint == newConstraint.extra_form_constraint;
      };


      var index = newConstraint.field_index;
      delete newConstraint.field_index;

      if (this.fields[index]['constraints'].filter(constraintIsAlreadySet).length > 0) {
        console.error('The constraint '+ newConstraint.extra_form_constraint +' is already set');
      } else {
        this.fields[index]['constraints'].push(newConstraint);
      }
    },

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function(index) {
      this.fields.splice(index, 1);
    }
  }
});