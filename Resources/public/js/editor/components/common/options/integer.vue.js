var integerOption = {

  template:
      '<div class="form-group">' +
          '<label :for="name">{{ name }}</label>' +
          '<input class="form-control" :required="option.options.required" :value="data" @input="updateOption($event.target.value)" type="number" :name="name">' +
      '</div>'
  ,

  mixins: [optionMixin]

};
