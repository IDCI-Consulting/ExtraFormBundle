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
      //this.getExtraFormTypeOptions(this.selectedExtraFormType);
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