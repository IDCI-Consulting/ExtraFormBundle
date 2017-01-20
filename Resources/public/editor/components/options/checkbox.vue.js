var checkboxOption = {

  template:
    '<div>' +
      '<label for="option.name">{{ option.name }}</label>' +
      '<input type="checkbox" :name="option.name" :checked="value" @click="updateOption($event.target.checked)"> ' +
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
