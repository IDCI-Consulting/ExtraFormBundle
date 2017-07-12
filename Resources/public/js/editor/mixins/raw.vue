<script>

/**
 * Methods used to generate raw json
 */

import JsonToTwigTransformer from '../utils/JsonToTwigTransformer.js';

export default {

  methods: {

    /**
     * Create the raw recursively for each configuration option
     *
     * @param fields
     */
    createExtraFormRawRecursively: function (fields) {
      // We need to clone the fields, else changes to the raw are reflected on the fields
      var cloneFields = JSON.parse(JSON.stringify(fields));
      var raw = {};

      for (var i = 0, len = cloneFields.length; i < len; i++) {
        var field = cloneFields[i];
        var name = field.name;

        raw[name] = {};
        raw[name].extra_form_type = field.extra_form_type;
        raw[name].constraints = field.constraints;
        raw[name].options = this.formatOptions(field.options);

        if (typeof field.options.configuration !== 'undefined') {
          if (0 === field.options.configuration.length) {
            // Hide the configuration in the raw key if it's empty
            delete raw[name].options.configuration;
          } else {

            /* Each time a configuration option is found and if it's not empty,
             recursively create the raw for this configuration */
            raw[name].options.configuration = this.createExtraFormRawRecursively(raw[name].options.configuration);
          }
          raw[name].constraints = field.constraints;
        }
      }

      return raw;
    },

    /**
     * Create the fields array recursively from a javascript object
     *
     * @param object
     */
    createFieldsRecursively: function (object) {

      var newFields = [];
      var index = 0;

      for (var field in object) {
        if (object.hasOwnProperty(field)) {
          index += 1;
          // If created form the raw, the name is the key
          // If created form the configured type, the name is in the name property
          var name = 'undefined' === typeof object[field].name ? field : object[field].name;
          var newField = {
            name: name,
            extra_form_type: object[field].extra_form_type,
            options: object[field].options,
            constraints: object[field].constraints
          };

          // Set the first field as active
          newField.active = 1 === index;

          if (typeof object[field].options.configuration !== 'undefined') {
            newField.options.configuration = this.createFieldsRecursively(object[field].options.configuration);
          }

          newFields.push(newField);
        }
      }

      return newFields;
    },

    /**
     * Format the options
     * - Remove the empty options
     * - Try to parse the option if it's an object
     *
     * @param options
     *
     * @return options
     */
    formatOptions: function (options) {
      for (var option in options) {
        if (options.hasOwnProperty(option)) {
          try {
            // Remove empty options
            if (0 === options[option].length) {
              delete options[option];
            } else {
              options[option] = JSON.parse(JsonToTwigTransformer.toJson(options[option]));
            }
          } catch (e) {}
        }
      }

      return options;
    }

  }

};

</script>
