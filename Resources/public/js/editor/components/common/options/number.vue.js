
import optionMixin from '../../../mixins/option.vue.js';

export default {

  template:
    '<div class="form-group">' +
      '<label :for="name">{{ name }}</label>' +
      '<div class="form-control-wrapper">' +
        '<span v-if="option.options.help">{{ option.options.help }}</span>' +
        '<input ' +
          'class="form-control" ' +
          ':required="option.options.required" ' +
          ':value="data" ' +
          '@input="updateOption($event.target.value)" ' +
          'type="text" ' +
          ':name="name"' +
        '>' +
      '</div>' +
    '</div>',

  mixins: [optionMixin]

};
