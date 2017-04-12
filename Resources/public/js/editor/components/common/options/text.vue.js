/* exported textOption */
var textOption = {

  template:
    '<div class="form-group">' +
      '<label :for="name">' +
        '{{ name }}' +
        '<i :class="classes" aria-hidden="true"></i>' +
      '</label>' +
      '<input class="form-control" ' +
        ':required="option.options.required" ' +
        ':value="data" ' +
        '@input="onOptionValueChanged($event.target.value)" ' +
        'type="text" ' +
        ':name="name"' +
      '>' +
    '</div>',

  /* global jsonOptionMixin */
  mixins: [jsonOptionMixin]

};
