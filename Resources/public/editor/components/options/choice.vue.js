var choiceOption = {

  template:
    '<div>' +
      '<label :for="option.name">{{ option.name }}</label>' +
      '<select :name="option.name" @change="updateOption($event.target.value)">' +
        '<option :selected="key == option.options.data" :value="key" v-for="(choice, key) in option.options.choices">{{ choice }}</option>' +
      '</select>' +
    '</div>'
  ,

  props: ['option', 'field'],

  methods: {
    updateOption: function(value) {
      this.$set(this.field.options, this.option.name, value);
    }
  }
};