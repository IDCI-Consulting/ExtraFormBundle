var checkboxOption = {

  template:
    '<div>' +
        '<label for="name">{{ name }}</label>' +
        '<input :required="option.options.required" type="checkbox" :name="name" :checked="value" @click="updateOption($event.target.checked)"> ' +
    '</div>'
  ,

  props: ['option', 'name', 'value'],

  methods: {
    updateOption: function(value) {
      this.$emit('changed', {
        'name': this.name,
        'value': value
      });
    }
  }
};
