var integerOption = {

  template:
      '<div>' +
          '<label :for="name">{{ name }}</label>' +
          '<input :required="option.options.required" :value="data" @input="updateOption($event.target.value)" type="number" :name="name">' +
      '</div>'
  ,

  mixins: [optionMixin]

};
