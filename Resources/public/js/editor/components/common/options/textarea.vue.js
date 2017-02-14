var textareaOption = {

  template:
      '<div>' +
          '<label :for="name">{{ name }}</label>' +
          '<textarea :required="option.options.required" :value="data" @input="updateOption($event.target.value)" :name="name"></textarea>' +
      '</div>'
  ,

  mixins: [optionMixin]

};
