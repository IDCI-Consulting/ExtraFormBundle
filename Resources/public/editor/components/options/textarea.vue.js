var textareaOption = {

  template:
    '<div>' +
      '<label :for="name">{{ name }}</label>' +
      '<textarea :value="value" @input="updateOption($event.target.value)" :name="name"></textarea>' +
    '</div>'
  ,

  props: ['option', 'value', 'name'],

  methods: {
    updateOption: function(value) {
      this.$emit('changed', {
        'name': this.name,
        'value': value
      });
    }
  }
};
