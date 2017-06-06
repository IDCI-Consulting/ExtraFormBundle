/* exported checkboxOption */
var checkboxOption = {

  template:
    '<div class="form-group">' +
      '<label for="name">{{ name }}</label>' +
      '<div class="form-control-wrapper">' +
        '<span v-if="option.options.help">{{ option.options.help }}</span>' +
        '<input ' +
          ':required="option.options.required" ' +
          'type="checkbox" ' +
         ':name="name" ' +
         ':checked="data" ' +
          '@click="updateOption($event.target.checked)"' +
        '> ' +
      '</div>' +
    '</div>',

  /* global optionMixin */
  mixins: [optionMixin]

};
