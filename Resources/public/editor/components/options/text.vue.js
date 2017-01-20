var textOption = {

  template:
    '<div>' +
      '<label :for="option.name">{{ option.name }}</label>' +
      '<input :value="value" @input="updateOption($event.target.value)" type="text" :name="option.name">' +
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
