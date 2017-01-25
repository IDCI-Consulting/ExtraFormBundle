var editor = {

  template:
    '<div id="extra-form-fields">' +
      '<field @removed="removeField" v-for="(field, index) in fields" :field="field" :index="index"/>' +
      '<new-field @created="addField"></new-field>' +
    '</div>'
  ,

  props: ['fields'],

  components: {
    'new-field': newField,
    'field': field
  },

  methods: {

    /**
     * Generate a unique id for the fields default names
     *
     * @returns string
     */
    generateUniqueId: function() {
      return Math.random().toString(36).substr(2, 9);
    },

    /**
     * Add a new field
     *
     * @param event
     */
    addField: function(field) {
      this.fields.push(field);
    },

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function(index) {
      this.fields.splice(index, 1);
    }
  }
};