/* global Vue */
Vue.component('editor-raw', {

  template:
    '<div>' +
        '<textarea ' +
          ':data-textarea-id="textarea.id" ' +
          'v-model="raw" ' +
          ':name="textarea.name" ' +
          'style="width: 100%; height: 300px;"' +
        '>' +
        '</textarea>' +
        '<button class="close-modal" @click.prevent="generateFields">' +
          'Fill the visual mode form fields from this json' +
        '</button>' +
    '</div>',

  props: ['fields'],

  data: function () {
    return {
      raw: '',
      textarea: this.$store.state.formProperties
    };
  },

  /* global rawMixin */
  mixins: [rawMixin],

  created: function () {
    try {
      // If the textarea is empty, do not attempt to generate fields
      if (this.textarea.value !== '') {
        this.raw = this.textarea.value;
        this.generateFields();
      }
      // Json parsing error
    } catch (e) {}
  },

  watch: {
    fields: {
      handler: function (newFields) {
        this.raw = this.generateOutput(newFields);
        this.updateInitialTextareaValue();
      },
      deep: true
    }
  },

  methods: {

    /**
     * Set the new value of the initial textarea
     */
    updateInitialTextareaValue: function () {
      document.getElementById(this.textarea.id).value = this.raw;
    },

    /**
     * Generate the form fields from the textarea raw
     */
    generateFields: function () {
      var newFields = [];

      try {
        var raw = JSON.parse(this.raw);

        newFields = this.createFieldsRecursively(raw);
        this.$emit('generated', newFields);
        // Json parsing error
      } catch (e) {}
    },

    /**
     * Generate the raw (the json for the textarea)
     *
     * @param fields
     */
    generateOutput: function (fields) {
      var raw = this.createOutputRecursively(fields);

      return JSON.stringify(raw, null, 4);
    },

    /**
     * Create the raw recursively for each configuration option
     *
     * @param fields
     */
    createOutputRecursively: function (fields) {
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
            raw[name].options.configuration = this.createOutputRecursively(raw[name].options.configuration);
          }
          raw[name].constraints = field.constraints;
        }
      }

      return raw;
    }

  }
});
