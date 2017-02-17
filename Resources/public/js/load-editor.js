$(window).on('load', function() {

  /*************************************************************************/
  /* Create the editor for each textareas with the class extra form editor */
  /*************************************************************************/

  $('textarea.extra-form-editor').each(function(index) {

    var formProperties = createAttributeMapObject(this); // retrieve the textarea attributes
    formProperties.value = this.value;

    var appId = 'editorApp' + index;
    var availableModes = formProperties['data-available-modes'].split('__');
    var configuration = window[formProperties['data-configuration-variable']];

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
            '<editor-raw :fields="fields" @generated="updateFields"></editor-raw>' +
            '<br>' +
          '</div>' +
          '<div class="modal-footer">' +
            '<button class="btn btn-default close-modal">Close the editor <i class="fa fa-times"></i></button>' +
          '</div>'+
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
                '<button class="btn btn-default close-modal">Close the editor <i class="fa fa-times"></i></button>' +
                '<em>All your changes are automatically saved</em>' +
              '</div>'+
            '</div>' +
          '</div>' +
        '</div>'
      ;

      simpleModalButton = '<button class="trigger-simple-visual-mode-modal">Simple visual mode</button>';
    }

    var advancedModal = '';
    var overviewModal = '';
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
                '<button class="btn btn-default close-modal">Close the editor <i class="fa fa-times"></i></button>' +
                '<button class="btn btn-primary trigger-overview-modal">Display the overview <i class="fa fa-eye"></i></button>' +
                '<em>All your changes are automatically saved</em>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      ;

      overviewModal =
        '<div id="modal_overview" class="modal fade overview-modal">' +
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title">Overview</h4>' +
              '</div>' +
              '<div class="modal-body">' +
                  '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>' +
              '</div>' +
              '<div class="modal-footer">' +
                '<button class="btn btn-default close-modal">Close the overview <i class="fa fa-times"></i></button>' +
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
           simpleModalButton + ' ' + advancedModalButton + ' ' + rawModalButton + ' ' + overviewModal +
        '</div>' +
        '<br>' +
        '<div class="modals">' +
           simpleModal + advancedModal + rawModal +
        '</div>' +
      '</div>'
    );

    triggerEditor('#' + appId, formProperties, configuration);

  });

  /*********************************************/
  /* Show or hide options on the simple editor */
  /*********************************************/

  var $simpleEditor = $('.editor-simple');

  $simpleEditor.on('click', '.field-options > label', function(event) {
    event.stopImmediatePropagation(); // prevent the click for being triggered multiple times
    $(this).parent().toggleClass('show');
  });

  $simpleEditor.on('click', '.field-constraint-options > label', function(event) {
    event.stopImmediatePropagation();
    $(this).parent().toggleClass('show');
  });

  /*****************************/
  /* Display / Hide the modals */
  /*****************************/

  var modals = ['simple-visual-mode-modal', 'advanced-visual-mode-modal', 'raw-mode-modal', 'overview-modal'];

  modals.forEach(function(modal) {
    $(document).on('click', 'button.trigger-' + modal, function(event) {
      event.preventDefault();

      if ('overview-modal' === modal) {
        $modal = $('.' + modal);
      } else {
        $modal = $('.modals .' + modal).first();
      }

      $modal.modal('show');
    });
  });

  modals.forEach(function(modal) {
    // close the modal on click
    var classes =
        '.' + modal + ' .modal-body button.close-modal, ' +     // on the generate field button from the editor-raw
        '.' + modal + ' .modal-footer > button.close-modal, ' + // on the upper right cross of the modal
        '.' + modal + ' .modal-header > button.close'           // on the close button on the left bottom of the modal
      ;

    $(document).on('click', classes, function(event) {
      event.preventDefault();
      $(this).closest('.modal').modal('hide');
    });
  });

});