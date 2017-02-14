var numberOption = {

  template:
      '<div>' +
          '<label :for="name">{{ name }}</label>' +
          '<input :required="option.options.required" :value="data" @input="updateOption($event.target.value)" type="text" :name="name">' +
      '</div>'
  ,

  mixins: [optionMixin]

};
