var optionMixin = {

  props: ['option', 'name', 'value'],

  data: function() {
    return  {
      data: this.option.options.data // default value
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