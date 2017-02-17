var checkboxOption = {

  template:
      '<div class="form-group">' +
          '<label for="name">{{ name }}</label>' +
          '<input :required="option.options.required" type="checkbox" :name="name" :checked="data" @click="updateOption($event.target.checked)"> ' +
      '</div>'
  ,

  mixins: [optionMixin]

};
