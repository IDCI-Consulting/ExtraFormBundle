/* global Vue */
Vue.component('form-editor-raw', {

  template:
    '<div>' +
        '<textarea ' +
          ':data-textarea-id="textarea.id" ' +
          'v-model="raw" ' +
          ':name="textarea.name" ' +
          'style="width: 100%; height: 300px;"' +
        '>' +
        '</textarea>' +
        '<div class="json-errors"></div>' +
        '<button @click.prevent="generateFields">' +
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
    // If the textarea is empty, do not attempt to generate fields
    if (this.textarea.value !== '') {
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
     * Set the new value of the initial textarea
     */
    updateInitialTextareaValue: function () {
      if (this.textarea.id) {
        document.getElementById(this.textarea.id).value = this.raw;
      }
    },

    /**
     * Generate the form fields from the textarea raw
     */
    generateFields: function (event) {
      var newFields = [];

      try {
        var raw = JSON.parse(jsonifyTwigStrings(this.raw));

        newFields = this.createFieldsRecursively(raw);

        this.$emit('generated', newFields);

        // close the modal if everything is fine
        $(event.target)
          .closest('.modal')
          .modal('hide')
        ;

        // Json parsing error
      } catch (e) {
        $(event.target)
          .siblings('.json-errors')
          .text('There are errors in your json : ' + e)
        ;
      }
    },

    /**
     * Generate the raw (the json for the textarea)
     *
     * @param fields
     */
    generateRaw: function (fields) {
      var raw = this.createExtraFormRawRecursively(fields);

      return twigifyJsonString(JSON.stringify(raw, null, 4));
    }

  }
});
