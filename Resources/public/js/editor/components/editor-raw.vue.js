/* global Vue */
Vue.component('form-editor-raw', {

  template:
    '<div class="extra-form-editor raw-mode">' +
      '<textarea :id="id" v-model="raw"></textarea>' +
      '<div class="json-errors">{{ error.message }}</div>' +
      '<button style="margin-right: 20px" @click.prevent="generateFields">' +
        'Fill the visual mode form fields from this json' +
      '</button>' +
      '<button @click.prevent="saveRaw">' +
        'Save the content of the textarea (even if the json is not valid)' +
      '</button>' +
    '</div>',

  props: ['fields'],

  /* global rawMixin, rawModalMixin */
  mixins: [rawMixin, rawModalMixin],

  created: function () {
    // If the textarea is empty, do not attempt to generate fields
    if ('undefined' !== typeof this.textarea && '' !== this.textarea.value) {
      this.raw = this.textarea.value;
      this.generateFields();
    }
  },

  watch: {
    fields: {
      handler: function (newFields) {
        this.raw = this.generateRaw(newFields);
        this.updateInitialTextareaValue();
      },
      deep: true
    }
  },

  methods: {

    /**
     * Generate the form fields from the textarea raw
     */
    generateFields: function () {
      var newFields = [];

      try {
        /* global JsonToTwigTransformer */
        var transformedJson = JsonToTwigTransformer.toJson(this.raw);
        var raw = JSON.parse(transformedJson);

        newFields = this.createFieldsRecursively(raw);

        this.$emit('generated', newFields);
        this.closeModal();

      // Json parsing error
      } catch (error) {
        this.handleJsonError(error, transformedJson);
      }
    },

    /**
     * Generate the raw (the json for the textarea)
     *
     * @param fields
     */
    generateRaw: function (fields) {
      var raw = this.createExtraFormRawRecursively(fields);

      /* global JsonToTwigTransformer */
      return JsonToTwigTransformer.toRaw(JSON.stringify(raw, null, 4));
    },

    /**
     * Get the css selector of the modal containing the raw
     *
     * @returns {string}
     */
    getModalSelector: function () {
      return '#' + this.$store.state.configuration.componentId + ' .raw-mode-modal';
    }

  }
});
