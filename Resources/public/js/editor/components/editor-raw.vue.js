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
        this.closeModal(event);

      // Json parsing error
      } catch (e) {
        this.displayJsonParseErrors(event);
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
    },

    /**
     * Close the modal
     *
     * @param event - the event triggered by the click on the button
     */
    closeModal: function (event) {
      if (typeof event !== 'undefined') {
        $(event.target)
          .closest('.modal')
          .modal('hide')
        ;

        // Remove last errors
        $(event.target)
          .siblings('.json-errors')
          .empty()
        ;
      }
    },

    /**
     * Display the errors caused by json parse
     *
     * @param event
     */
    displayJsonParseErrors: function (event) {
      if (typeof event !== 'undefined') {
        $(event.target)
          .siblings('.json-errors')
          .text('There are errors in your json : ' + e)
        ;
      }
    }

  }
});
