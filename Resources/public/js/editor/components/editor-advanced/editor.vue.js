Vue.component('editor-advanced', {

  template:
  '<div class="editor-advanced row">' +
    '<extra-form-types @created="addField" class="extra-form-types col-md-3"></extra-form-types>' +
    '<extra-form-fields :fields="fields" class="extra-form-fields col-md-5"></extra-form-fields>' +
    '<extra-form-fields-configuration :fields="fields" class="extra-form-fields-configuration col-md-4"></extra-form-fields-configuration>' +
  '</div>'
  ,

  props: ['fields'],

  components: {
    'extra-form-types': extraFormTypes,
    'extra-form-fields': extraFormFields,
    'extra-form-fields-configuration': extraFormFieldsConfiguration
  },

  methods: {

    /**
     * Add a new field
     *
     * @param field
     */
    addField: function(field) {
      this.resetActiveClasses();
      field.active = true;
      this.fields.push(field);
    },

    resetActiveClasses: function() {
      for (var i= 0, len = this.fields.length; i < len; i++) {
        this.$set(this.fields[i], 'active', false);
      }
    }
  }

});