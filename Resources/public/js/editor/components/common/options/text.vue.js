/* exported textOption */
var textOption = {

  template:
    '<div class="form-group">' +
      '<label :for="name">{{ name }}</label>' +
      '<input class="form-control" ' +
        ':required="option.options.required" ' +
        ':value="data" ' +
        '@input="onOptionValueChanged($event.target.value)" ' +
        'type="text" ' +
        ':name="name"' +
      '>' +
      '<i :class="classes" aria-hidden="true"></i>' +
    '</div>',

  data: function () {
    return {
      classes: ''
    };
  },

  /* global optionMixin */
  mixins: [optionMixin],

  methods: {
    onOptionValueChanged: function (value) {
      this.updateOption(value);
      this.setJsonAttemptClass(value);
    }
  }

};
