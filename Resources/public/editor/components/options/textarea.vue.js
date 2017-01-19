var textareaOption = {

  template:
    '<div>' +
      '<label :for="option.name">{{ option.name }}</label>' +
      '<textarea :value="field.options[option.name]" @input="updateOption($event.target.value)" :name="option.name"></textarea>' +
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
