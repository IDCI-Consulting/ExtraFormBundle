var choiceOption = {

  template:
      '<div>' +
          '<label :for="name">{{ name }}</label>' +
          '<select :required="option.options.required" v-model="selected" :name="name" @change="updateOption($event.target.value)">' +
              '<option :value="key" v-for="(choice, key) in option.options.choices">{{ choice }}</option>' +
          '</select>' +
      '</div>'
  ,

  props: ['option', 'name', 'value'],

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
        'name': this.name,
        'value': value
      });
    }
  }
};