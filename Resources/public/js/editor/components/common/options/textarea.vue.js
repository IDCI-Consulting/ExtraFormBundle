
import jsonOptionMixin from '../../../mixins/jsonOption.vue.js';

export default {

  template:
    '<div class="form-group">' +
      '<label :for="name">' +
        '{{ name }}' +
        '<i :class="classes" aria-hidden="true"></i>' +
      '</label>' +
      '<div class="form-control-wrapper">' +
        '<span v-if="option.options.help">{{ option.options.help }}</span>' +
        '<textarea class="form-control" ' +
          ':required="option.options.required" ' +
          ':value="data" ' +
          '@input="onOptionValueChanged($event.target.value)" ' +
          ':name="name">' +
        '</textarea>' +
      '</div>' +
    '</div>',

  mixins: [jsonOptionMixin]

};
