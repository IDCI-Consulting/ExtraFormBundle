var textareaOption = {

  template:
    '<div>' +
      '<label :for="option.name">{{ option.name }}</label>' +
      '<textarea :value="value" @input="updateOption($event.target.value)" :name="option.name"></textarea>' +
    '</div>'
  ,

  props: ['option', 'value'],

  methods: {
    updateOption: function(value) {
      this.$emit('changed', {
        'name': this.option.name,
        'value': value
      });
    }
  }
};
