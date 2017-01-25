Vue.use(VueResource);

function log(message) {
  console.log(JSON.stringify(message, null, 4));
}

var app = new Vue({

  el: '#editorApp',
  delimiters: ['${', '}'], // avoid conflicts with twig
  data: {
    fields: []
  },

  components: {
    'new-field': newField,
    'textarea-output': textareaOutput,
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
     * Update the fields
     *
     * @param fields
     */
    updateFields: function(fields) {
      this.$set(this, 'fields', fields);
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
});