var field = {

  template:
      '<div>' +
        '<label>Name : </label>' +
        '<input type="text" v-model="field.name" /><br>' +
        '<label>Options : </label>' +
        '<field-options :fieldOptions="field.options" :type="field.extra_form_type" @optionChanged="updateOption"></field-options>' +
        '<button v-on:click.prevent="removeField(index)">x</button>' +
      '</div>'
  ,

  props: ['field', 'index'],

  components: {
    'field-options': fieldOptions
  },

  methods: {

    /**
     * Update the option
     *
     * @param fieldOption
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
    }
  }
};