/**
 * Editor configuration
 */
var extraFormEditorConfiguration = {
  'enableTextareaOutput': false
};

/**
 * Look for textareas with the editorable class, and replace them with the editor application base html
 * Then, trigger the function to start the vuejs magic
 */
$(window).on('load', function() {

  $('textarea.extra-form-editor').each(function(index) {
    var textarea = {
      value: $(this).val(),
      id: $(this).attr('id'),
      name: $(this).attr('name')
    };
    var appId = 'editorApp' + index;

    $(this).replaceWith(
      '<div id="' + appId + '" data-configuration-variable="extraFormEditorConfiguration">' +
        '<br><button class="trigger-visual-mode-modal">Visual mode</button> ' +
        '<button class="trigger-raw-mode-modal">Raw mode</button><br><br>' +

        // RAW MODAL
        '<div class="modal fade modal-fullscreen raw-mode-modal">' +
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title">Editor in raw mode</h4>' +
              '</div>' +
            '<div class="modal-body">' +
              '<textarea-output ' +
                'v-if="configuration.enableTextareaOutput" ' +
                ':fields="fields" ' +
                ':textarea="textarea" ' +
                '@generated="updateFields">' +
              '</textarea-output>' +
              '<br>' +
            '</div>' +
          '</div>' +
      '</div>' +

      // VISUAL MODAL
      '</div>' +
        '<div class="modal fade modal-fullscreen visual-mode-modal">' +
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                 '<h4 class="modal-title">Editor in visual mode</h4>' +
              '</div>' +
              '<div class="modal-body">' +
                '<editor :fields="fields"></editor>' +
              '</div>' +
              '<div class="modal-footer">' +
                '<button class="close-visual-mode">Close the editor</button>' +
                '<em>All your changes are automatically saved</em>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    triggerEditor(
      '#' + appId,
      textarea
    );
  });

});