var field = {

  template:
      '<div>' +
        '<label>Name : </label>' +
        '<input type="text" v-model="field.name" /><br>' +
        '<label>Options : </label>' +
        '<field-options :field="field" :index="index" @optionChanged="updateOption"></field-options>' +
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
    updateOption: function(fieldOption) {
      this.$emit('optionchanged', fieldOption);
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