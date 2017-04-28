/**
 * Base component for a field option
 */
/* exported optionMixin */

var optionMixin = {

  props: ['option', 'name', 'value'],

  data: function () {
    return {
      // Default value from the api
      data: this.option.options.data
    };
  },

  /**
   * Update the value on component creation
   */
  created: function () {
    if (typeof this.value !== 'undefined') {
      this.data = this.value;
      if ('object' === typeof this.value) {
        this.data = JSON.stringify(this.value);
      }
    }
  },

  /**
   * Update the value on component update
   */
  watch: {
    value: {
      handler: function (value) {
        if (typeof value !== 'undefined') {
          this.data = value;
          if ('object' === typeof value) {
            this.data = JSON.stringify(value);
          }
        }
      }
    }
  },

  methods: {

    /**
     * Update an option value for the raw
     *
     * @param value
     */
    updateOption: function (value) {
      if (typeof value !== 'undefined') {
        this.data = value;
        this.$emit('changed', {
          name: this.name,
          value: value
        });
      }
    }
  }
};
