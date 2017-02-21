var textareaOption = {

  template:
      '<div class="form-group">' +
          '<label :for="name">{{ name }}</label>' +
          '<textarea class="form-control" ' +
              ':required="option.options.required" ' +
              ':value="data" ' +
              '@input="onOptionValueChanged($event.target.value)" ' +
              ':name="name">' +
          '</textarea>' +
          '<i :class="classes" aria-hidden="true"></i>' +
      '</div>'
  ,

  data: function() {
    return {
      classes: ''
    }
  },

  mixins: [optionMixin],

  methods: {
    onOptionValueChanged: function(value) {
      this.updateOption(value);
      this.setJsonAttemptClass(value);
    }
  }

};
