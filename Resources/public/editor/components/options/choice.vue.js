var choiceOption = {

  template:
    '<div>' +
      '<label :for="option.name">{{ option.name }}</label>' +
      '<select v-model="selected" :name="option.name" @change="updateOption($event.target.value)">' +
        '<option :value="key" v-for="(choice, key) in option.options.choices">{{ choice }}</option>' +
      '</select>' +
    '</div>'
  ,

  props: ['option', 'value'],

  data: function() {
    return  {
      selected: this.option.options.data // default value
    }
  },

  /**
   * Update the selected value when the value updates
   */
  watch: {
    value: {
      handler: function(newValue) { this.selected = newValue; },
      deep: true
    }
  },

  /**
   * Update the selected value at first
   */
  created: function() {
    if (typeof this.value !== 'undefined') {
      this.selected = this.value;
    }
  },

  methods: {
    updateOption: function(value) {
      this.$emit('changed', {
        'name': this.option.name,
        'value': value
      });
    }
  }
};