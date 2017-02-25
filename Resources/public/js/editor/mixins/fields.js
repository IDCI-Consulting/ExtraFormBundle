/**
 * Global methods used to get icons
 */
/* exported fieldsMixin */
var fieldsMixin = {

  methods: {

    /**
     * Create the fields array recursively from a javascript object
     *
     * @param object
     */
    createFieldsRecursively: function(object) {

      var newFields = [];
      var index = 0;

      for (var field in object) {
        index = index + 1;
        if (object.hasOwnProperty(field)) {
          // if created form the raw, the name is the key
          // if created form the configured type, the name is in the name property
          var name = typeof object[field].name === 'undefined'? field : object[field].name;
          var newField = {
            name: name,
            extra_form_type: object[field].extra_form_type,
            options:  object[field].options,
            constraints:  object[field].constraints
          };

          // Set the first field as active
          newField.active = (index === 1 ? true : false);

          if (typeof object[field].options.configuration !== 'undefined') {
            newField.options.configuration = this.createFieldsRecursively(object[field].options.configuration);
          }

          newFields.push(newField);
        }
      }

      return newFields;
    }
  }

};