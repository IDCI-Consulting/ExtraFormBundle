var field = {

  template:
      '<div>' +
        '<label>Name : </label>' +
        '<input type="text" v-model="field.name" /><br>' +
        '<label>Options : </label>' +
        '<field-options :type="field.extra_form_type"></field-options>' +
        '<button v-on:click.prevent="removeField(index)">x</button>' +
      '</div>'
  ,

  props: ['field', 'index'],

  components: {
    'field-options': fieldOptions
  },

  methods: {

    /**
     * Remove a field
     *
     * @param event
     */
    removeField: function(index) {
      this.$emit('removed', index);
    }
  }
};