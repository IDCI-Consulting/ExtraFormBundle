/* exported numberOption */
var numberOption = {

  template:
    '<div class="form-group">' +
      '<label :for="name">{{ name }}</label>' +
      '<input ' +
        'class="form-control" ' +
        ':required="option.options.required" ' +
        ':value="data" ' +
        '@input="updateOption($event.target.value)" ' +
        'type="text" ' +
        ':name="name"' +
      '>' +
    '</div>',

  /* global optionMixin */
  mixins: [optionMixin]

};
