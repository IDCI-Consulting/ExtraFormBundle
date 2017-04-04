/* global Vue */
Vue.component('form-editor-advanced', {

  template:
    '<div class="editor-advanced editor row">' +
      '<extra-form-types @created="addField" class="extra-form-types col-md-3 col-lg-3"></extra-form-types>' +
      '<extra-form-fields :fields="fields" class="extra-form-fields col-md-4 col-lg-3"></extra-form-fields>' +
      '<extra-form-fields-configuration ' +
        ':fields="fields" ' +
        'class="extra-form-fields-configuration col-md-5 col-lg-6"' +
      '></extra-form-fields-configuration>' +
    '</div>',

  props: ['fields'],

  components: {

    /* global extraFormTypes */
    'extra-form-types': extraFormTypes,

    /* global extraFormFields */
    'extra-form-fields': extraFormFields,

    /* global extraFormFieldsConfiguration */
    'extra-form-fields-configuration': extraFormFieldsConfiguration
  },

  methods: {

    /**
     * Add a new field
     *
     * @param field
     */
    addField: function (field) {
      this.resetActiveClasses();
      field.active = true;
      this.fields.push(field);
    },

    resetActiveClasses: function () {
      for (var i = 0, len = this.fields.length; i < len; i++) {
        this.$set(this.fields[i], 'active', false);
      }
    }
  }

});
