/**
 * Look for textareas with the editorable class, and replace them with the editor application base html
 * Then, trigger the function to start the vuejs application
 */
$(window).on('load', function() {

  $('textarea.extra-form-editor').each(function(index) {

    var textarea = createAttributeMapObject(this); // the textarea attributes will be used as the configuration
    textarea.value = this.value;

    var appId = 'editorApp' + index;
    var availableModes = textarea['data-available-modes'].split('__');

    var rawModal =
      '<div id="modal_raw" class="modal fade modal-fullscreen raw-mode-modal">' +
        '<div class="modal-dialog" role="document">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
              '<h4 class="modal-title">Editor in raw mode</h4>' +
            '</div>' +
          '</div>' +
          '<div class="modal-body">' +
            '<editor-raw ' +
            'v-if="configuration.enableTextareaOutput" ' +
            ':fields="fields" ' +
            ':textarea="textarea" ' +
            '@generated="updateFields">' +
            '</editor-raw>' +
            '<br>' +
          '</div>' +
        '</div>' +
      '</div>'
    ;
    var rawModalButton = '<button class="trigger-raw-mode-modal">Raw mode</button>';

    var simpleModal = '';
    var simpleModalButton = '';

    if (availableModes.indexOf('simple') > -1) {
      simpleModal =
        '<div id="modal_simple" class="modal fade modal-fullscreen simple-visual-mode-modal">' +
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title">Simple visual mode</h4>' +
              '</div>' +
              '<div class="modal-body">' +
                '<editor-simple :fields="fields"></editor-simple>' +
              '</div>' +
              '<div class="modal-footer">' +
                '<button class="close-modal">Close the editor</button>' +
                '<em>All your changes are automatically saved</em>' +
              '</div>'+
            '</div>' +
          '</div>' +
        '</div>'
      ;
      simpleModalButton = '<button class="trigger-simple-visual-mode-modal">Simple visual mode</button>';
    }

    var advancedModal = '';
    var advancedModalButton = '';

    if (availableModes.indexOf('advanced') > -1) {
      advancedModal =
        '<div id="modal_advanced" class="modal fade modal-fullscreen advanced-visual-mode-modal">' +
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title">Advanced visual mode</h4>' +
              '</div>' +
              '<div class="modal-body">' +
                '<editor-advanced :fields="fields"></editor-advanced>' +
              '</div>' +
              '<div class="modal-footer">' +
                '<button class="close-modal">Close the editor</button>' +
                '<em>All your changes are automatically saved</em>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      ;
      advancedModalButton = '<button class="trigger-advanced-visual-mode-modal">Advanced visual mode</button>';
    }

    $(this).replaceWith(
      '<div id="' + appId + '" data-configuration-variable="extraFormEditorConfiguration">' +
        '<div class="modal-buttons">' +
           simpleModalButton + ' ' + advancedModalButton + ' ' + rawModalButton +
        '</div>' +
        '<br>' +
        '<div class="modals">' +
           simpleModal + advancedModal + rawModal +
        '</div>' +
      '</div>'
    );

    triggerEditor('#' + appId, textarea);
  });

});