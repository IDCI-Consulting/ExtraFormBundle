/**
 * Option where we can put json in (input type text and textareas)
 */
/* exported jsonOptionMixin */

var jsonOptionMixin = {

  /* global optionMixin */
  mixins: [optionMixin],

  data: function () {
    return {
      classes: ''
    };
  },

  /**
   * Update the value on component creation
   */
  created: function () {
    if ('object' === typeof this.value) {
      this.data = twigifyJsonString(JSON.stringify(this.value, null, 4));
      this.setJsonAttemptClass(this.data);
    }
  },

  /**
   * Update the value on component update
   */
  watch: {
    value: {
      handler: function (value) {
        if ('object' === typeof value) {
          /* global twigifyJsonString */
          this.data = twigifyJsonString(JSON.stringify(value, null, 4));
          this.setJsonAttemptClass(this.data);
        }
      }
    }
  },

  methods: {
    onOptionValueChanged: function (value) {
      this.updateOption(value);
      this.setJsonAttemptClass(value);
    },

    /**
     * Set a class on the input or textarea to add an icon indicating if the json is valid
     * A json attempt is considered id '{' or '[' are typed first
     *
     * @param value
     */
    setJsonAttemptClass: function (value) {
      if (
        0 !== value.indexOf('{{') &&
        (0 === value.indexOf('{') || 0 === value.indexOf('['))
      ) {
        try {
          /* global jsonifyTwigStrings */
          JSON.parse(jsonifyTwigStrings(value));
          this.classes = 'fa fa-check success feedback';
        } catch (e) {
          this.classes = 'fa fa-exclamation-circle warning feedback';
        }
      } else {
        this.classes = '';
      }
    }
  }
};
