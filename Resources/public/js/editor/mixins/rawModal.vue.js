/* global $, CodeMirror, generateUniqueId */

/**
 * Global methods for the raw editor modals
 */

/* exported rawModalMixin */
var rawModalMixin = {

  data: function () {
    return {
      id: generateUniqueId(),
      raw: '',
      textarea: this.$store.state.formProperties,
      rawEditor: null,
      error: {
        message: '',
        lineNumber: 0
      }
    };
  },

  mounted: function () {
    this.initCodeMirrorEditor();
  },

  methods: {

    /**
     * Save the content of the raw textarea in the initial textarea
     */
    saveRaw: function () {
      this.updateInitialTextareaValue();
      this.closeModal();
    },

    /**
     * Parse the json error to highlight the line where the error was found
     *
     * @param error
     * @param wrongJson
     */
    handleJsonError: function (error, wrongJson) {
      if (null !== this.rawEditor) {
        this.rawEditor.removeLineClass(this.error.lineNumber - 1, 'background');
      }

      this.error = {
        message: 'There are errors in your json : ' + error.message,
        lineNumber: this.getJsonErrorLineNumber(error, wrongJson)
      };

      if (null !== this.rawEditor) {
        this.rawEditor.addLineClass(this.error.lineNumber - 1, 'background', 'line-error');
        this.rawEditor.setCursor({
          line: this.error.lineNumber + 15,
          ch: 0
        });
      }
    },

    /**
     * Get the number of the line where the json error is
     */
    getJsonErrorLineNumber: function (error, wrongJson) {
      var regex = /Unexpected token (.*) in JSON at position ([0-9].*)/g;
      var matches = regex.exec(error.message);
      var errorIndex = Number(matches[2]) - matches[1].length;

      return wrongJson.substring(0, errorIndex).split('\n').length;
    },

    /**
     * Initialize the code mirror editor
     */
    initCodeMirrorEditor: function () {
      var self = this;

      $(this.getModalSelector()).on('shown.bs.modal', function () {

        if (null === self.rawEditor) {
          self.rawEditor = CodeMirror.fromTextArea(document.getElementById(self.id), {
            lineNumbers: true
          });

          self.rawEditor.on('change', function () {
            self.raw = self.rawEditor.getValue();
          });
        } else {
          self.rawEditor.setValue(self.raw);
        }

        if (self.error.lineNumber) {
          self.rawEditor.addLineClass(self.error.lineNumber - 1, 'background', 'line-error');
          self.rawEditor.setCursor({
            line: self.error.lineNumber + 15,
            ch: 0
          });
        }
      });
    },

    /**
     * Set the new value of the initial textarea
     */
    updateInitialTextareaValue: function () {
      if (this.textarea.id) {
        document.getElementById(this.textarea.id).value = this.raw;
      }
    },

    /**
     * Close the modal
     */
    closeModal: function () {
      var $modal = $(this.getModalSelector());
      var modalIsOpen = ($modal.data('bs.modal') || {}).isShown;

      if (modalIsOpen) {
        // Reset the raw editor when the modal is closed
        this.rawEditor.removeLineClass(this.error.lineNumber - 1, 'background');
        this.error = {
          message: '',
          lineNumber: 0
        };

        $modal.modal('hide');
      }
    }

  }

};


