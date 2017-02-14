var textareaOption = {

  template:
      '<div>' +
          '<label :for="name">{{ name }}</label>' +
          '<textarea :required="option.options.required" :value="data" @input="updateOption($event.target.value)" :name="name"></textarea>' +
      '</div>'
  ,

  props: ['option', 'value', 'name'],

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
