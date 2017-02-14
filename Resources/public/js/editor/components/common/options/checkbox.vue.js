var checkboxOption = {

  template:
    '<div>' +
        '<label for="name">{{ name }}</label>' +
        '<input :required="option.options.required" type="checkbox" :name="name" :checked="data" @click="updateOption($event.target.checked)"> ' +
    '</div>'
  ,

  props: ['option', 'name', 'value'],

  data: function() {
    return {
      data: this.option.options.data
    }
  },

  /**
   * Update the selected value on component creation
   */
  created: function() {
    if (typeof this.value !== 'undefined') {
      this.data = this.value;
    }
  },

  methods: {
    updateOption: function(value) {
      this.$emit('changed', {
        'name': this.name,
        'value': value
      });
    }
  }
};
