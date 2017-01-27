Vue.component('editor', {

  template:
    '<div class="extra-form-fields">' +
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
     * Add a new field
     *
     * @param field
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