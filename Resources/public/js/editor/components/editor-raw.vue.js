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
    generateRaw: function (fields) {
      var raw = this.createExtraFormRawRecursively(fields);

      return JSON.stringify(raw, null, 4);
    }

  }
});
