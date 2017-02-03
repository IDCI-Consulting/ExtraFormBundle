Vue.component('editor-advanced', {

  template:
  '<div class="row">' +
    '<extra-form-types class="extra-form-types col-md-3"></extra-form-types>' +
    '<extra-form-fields class="extra-form-fields col-md-4"></extra-form-fields>' +
    '<extra-form-fields-configuration class="extra-form-fields-configuration col-md-5"></extra-form-fields-configuration>' +
  '</div>'
  ,

  props: ['fields'],

  components: {
    'extra-form-types': extraFormTypes,
    'extra-form-fields': extraFormFields,
    'extra-form-fields-configuration': extraFormFieldsConfiguration
  },

  methods: {

  }

});