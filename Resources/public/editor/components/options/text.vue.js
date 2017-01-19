var textOption = {

  template:
    '<div>' +
      '<label :for="option.name">{{ option.name }}</label>' +
      '<input :value="field.options[option.name]" @input="updateOption($event.target.value)" type="text" :name="option.name">' +
    '</div>'
  ,

  props: ['option', 'field'],

  methods: {
    updateOption: function(value) {
      this.$emit('changed', {
        'name': this.option.name,
        'value': value
      });
    }
  }
};
