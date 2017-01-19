var checkboxOption = {

  template:
    '<div>' +
      '<label for="option.name">{{ option.name }}</label>' +
      '<input type="checkbox" :name="option.name" :checked="field.options[option.name]" @click="updateOption($event.target.checked)"> ' +
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
