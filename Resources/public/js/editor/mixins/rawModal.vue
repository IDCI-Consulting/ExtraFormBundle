<script>

import {generateUniqueId} from '../utils/utils.js';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/dialog/dialog.js';

import CodeMirror from 'codemirror/lib/codemirror.js';

/**
 * Global methods for the raw editor modals
 */

export default {

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
      var regex = /(line|position) (\d+)/g;
      var matches = regex.exec(error.message);

      if (null !== matches) {
        if ('line' === matches[1]) {
          return Number(matches[2]);
        }

        if ('position' === matches[1]) {
          return wrongJson.substring(0, Number(matches[2]) - 1).split('\n').length;
        }
      }

      return 0;
    },

    /**
     * Initialize the code mirror editor
     */
    initCodeMirrorEditor: function () {
      var self = this;

      $(this.getModalSelector()).on('shown.bs.modal', function () {

        if (null === self.rawEditor) {
          self.rawEditor = CodeMirror.fromTextArea(document.getElementById(self.id), {
            lineNumbers: true,
            extraKeys: {
              'Ctrl-F': 'findPersistent'
            }
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
      if (typeof this.textarea !== 'undefined' && this.textarea.id) {
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

</script>
