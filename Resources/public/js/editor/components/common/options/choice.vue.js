var choiceOption = {

  template:
      '<div>' +
          '<label :for="name">{{ name }}</label>' +
          '<select :required="option.options.required" v-model="data" :name="name" @change="updateOption($event.target.value)">' +
              '<option :value="key" v-for="(choice, key) in option.options.choices">{{ choice }}</option>' +
          '</select>' +
      '</div>'
  ,

  mixins: [optionMixin],

  /**
   * Update the selected value when the value updates
   */
  watch: {
    value: {
      handler: function(newValue) { this.data = newValue; },
      deep: true
    }
  }

};