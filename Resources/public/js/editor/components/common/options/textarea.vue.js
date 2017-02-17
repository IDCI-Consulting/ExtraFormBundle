var textareaOption = {

  template:
      '<div class="form-group">' +
          '<label :for="name">{{ name }}</label>' +
          '<textarea class="form-control" :required="option.options.required" :value="data" @input="updateOption($event.target.value)" :name="name"></textarea>' +
      '</div>'
  ,

  mixins: [optionMixin]

};
