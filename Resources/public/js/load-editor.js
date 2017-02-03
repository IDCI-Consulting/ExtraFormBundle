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
          '<br>'+
          '<button class="trigger-simple-visual-mode-modal">Simple visual mode</button> ' +
          '<button class="trigger-advanced-visual-mode-modal">Advanced visual mode</button> '+
          '<button class="trigger-raw-mode-modal">Raw mode</button><br><br>' +

          // RAW MODAL
          '<div class="modal fade modal-fullscreen raw-mode-modal">' +
              '<div class="modal-dialog" role="document">' +
                  '<div class="modal-content">' +
                      '<div class="modal-header">' +
                          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
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
          '</div>' +

          // SIMPLE VISUAL MODAL
          '<div class="modal fade modal-fullscreen simple-visual-mode-modal">' +
              '<div class="modal-dialog" role="document">' +
                  '<div class="modal-content">' +
                      '<div class="modal-header">' +
                         '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                         '<h4 class="modal-title">Simple visual mode</h4>' +
                      '</div>' +
                      '<div class="modal-body">' +
                          '<editor-simple :fields="fields"></editor-simple>' +
                      '</div>' +
                      '<div class="modal-footer">' +
                          '<button class="close-simple-visual-mode">Close the editor</button>' +
                          '<em>All your changes are automatically saved</em>' +
                      '</div>'+
                  '</div>' +
              '</div>' +
          '</div>' +

          // ADVANCED VISUAL MODAL
          '<div class="modal fade modal-fullscreen advanced-visual-mode-modal">' +
              '<div class="modal-dialog" role="document">' +
                  '<div class="modal-content">' +
                      '<div class="modal-header">' +
                          '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                          '<h4 class="modal-title">Advanced visual mode</h4>' +
                      '</div>' +
                      '<div class="modal-body">' +
                          '<editor-advanced :fields="fields"></editor-advanced>' +
                      '</div>' +
                      '<div class="modal-footer">' +
                          '<button class="close-advanced-visual-mode">Close the editor</button>' +
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