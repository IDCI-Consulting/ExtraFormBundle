$(window).on('load', function() {

  /*************************************************************************/
  /* Create the editor for each textareas with the class extra form editor */
  /*************************************************************************/

  $('textarea.extra-form-editor').each(function(index) {

    var formProperties = createAttributeMapObject(this); // retrieve the textarea attributes
    formProperties.value = this.value;
    var editorComponentId = 'editorComponent' + index;
    var availableModes = formProperties['data-available-modes'].split('__');
    var configuration = window[formProperties['data-configuration-variable']];

    var rawModal = createRawModal(index);
    var rawModalButton = '<button class="trigger-raw-mode-modal-' + index + '">Raw mode</button>';

    var simpleModal = '', simpleModalButton = '';
    if (availableModes.indexOf('simple') > -1) {
      simpleModal = createSimpleModal(index);
      simpleModalButton = '<button class="trigger-simple-visual-mode-modal-' + index + '">Simple visual mode</button>';
    }

    var advancedModal = '';
    var overviewModal = '';
    var advancedModalButton = '';
    if (availableModes.indexOf('advanced') > -1) {
      advancedModal = createAdvancedModal(index);
      overviewModal = createOverviewModal(index);
      advancedModalButton = '<button class="trigger-advanced-visual-mode-modal-' + index + '">Advanced visual mode</button>';
    }

    /**
     * Insert buttons in place of the textarea
     */
    $(this).after(
      '<div class="modal-buttons">' +
         simpleModalButton + ' ' + advancedModalButton + ' ' + rawModalButton +
      '</div>'
    );

    /**
     * Insert the modals editor at the end of the body
     */
    (function() {
      var $body = $('body');
      $body.append('<div id="' + editorComponentId + '">' + rawModal + simpleModal + advancedModal + overviewModal + '</div>');
    }());

    // Hide the initial textarea
    this.style.display = 'none';

    /*****************************/
    /* Display / Hide the modals */
    /*****************************/

    var modalTypes = ['simple-visual-mode-modal', 'advanced-visual-mode-modal', 'raw-mode-modal', 'overview-modal'];

    modalTypes.forEach(function(modalType) {
      showModalOnClick(modalType, index)
    });

    modalTypes.forEach(function(modalType) {
      hideModalOnClick(modalType);
    });

    /*****************************************************/
    /* Set content on overview modal and submit the form */
    /*****************************************************/

    getFormOverviewOnClick(configuration.extra_form_editor_overview_url, index);
    resetFormOverviewModalOnClose(index);
    submitFormOverviewOnClick(index);

    triggerExtraFormBundleEditor('#' + editorComponentId, formProperties, configuration);

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

  /********************************************/
  /* Add some colors on empty required inputs */
  /********************************************/

  $(document).on('change', 'input[required="required"]', function() {
    if (!$(this).val()) {
      $(this).css({ 'border-color': '#c9302c', 'background-color': '#f3d9d9'});
    } else {
      $(this).css({ 'border-color': '#cccccc', 'background-color': '#ffffff'});
    }
  });

});

/**
 * Show modal on click on trigger button
 *
 * @param modalType
 * @param modalIdentifier
 */
function showModalOnClick(modalType, modalIdentifier) {
  $(document).on('click', 'button.trigger-' + modalType + '-' + modalIdentifier, function(event) {
    event.preventDefault();

    if ('overview-modal' === modalType) {
      $modal = $('#' + modalType + '-' + modalIdentifier);
    } else {
      $modal = $('#' + modalType + '-' + modalIdentifier).first();
    }

    $modal.modal('show');
  });
}

/**
 * Hide modal on click on close button
 *
 * @param modalType
 */
function hideModalOnClick(modalType) {
  // close the modal on click
  var classes =
      '.' + modalType + ' .modal-body button.close-modal, ' +     // on the generate field button from the editor-raw
      '.' + modalType + ' .modal-footer > button.close-modal, ' + // on the upper right cross of the modal
      '.' + modalType + ' .modal-header > button.close'           // on the close button on the left bottom of the modal
    ;

  $(document).on('click', classes, function(event) {
    event.preventDefault();
    $(this).closest('.modal').modal('hide');
  });
}

/**
 * Get the form overview on click on the trigger button
 *
 * @param index
 */
function getFormOverviewOnClick(url, index) {

  function getFormOverview(url, callback) {

    var raw = $('#raw-mode-modal-' + index + ' textarea').first().val();

    var request = $.ajax({
      url: url,
      method: 'POST',
      data: {
        overview: {'configuration': raw}
      }
    });

    request.done(function (response) {
      return callback({
        success: true,
        data: response
      });
    });

    request.fail(function (response) {
      return callback({
        success: false,
        data: response
      });
    });
  }

  $(document).on('click', 'button.trigger-overview-modal-' + index, function() {
    setTimeout(function() {
      getFormOverview(url, function(content) {
        if (content.success) {
          $('#overview-modal-' + index + ' .modal-body').replaceWith('<div class="modal-body">' + content.data + '</div>');
        } else {
          $('#overview-modal-' + index + ' .modal-body').replaceWith(
            '<div class="modal-body">' +
              '<div>' + content.data.responseText +'</div>' +
            '</div>'
          );
        }
      })
    }, 800);
  });
}

/**
 * Submit the form overview on click
 *
 * @param index
 */
function submitFormOverviewOnClick(index) {

  $(document).on('click', '#overview-modal-' + index + ' form button', function(event) {
    event.preventDefault();
    resetFormOverviewModal(index);
    var $form = $(this).closest('form');
    setTimeout(function() {
      submitForm($form, function(content) {
        if (content.success) {
          console.log(content.data);
          if (content.data) {
            $('#overview-modal-' + index + ' .modal-body').replaceWith('<div class="modal-body">' + content.data + '</div>');
          }
        } else {
          $('#overview-modal-' + index + ' .modal-body').replaceWith(
            '<div class="modal-body">' +
              '<div>' + content.data.responseText +'</div>' +
            '</div>'
          );
        }
      })
    }, 800);
  });
}

/**
 * Reset the content of the overview modal when it's closed
 *
 * @param index
 */
function resetFormOverviewModalOnClose(index) {
  $(document).on('hidden.bs.modal', '#overview-modal-' + index, function() {
    resetFormOverviewModal(index);
  });
}

/**
 * Reset the content of the overview modal
 *
 * @param index
 */
function resetFormOverviewModal(index) {
  $('#overview-modal-' + index + ' .modal-body').replaceWith(
    '<div class="modal-body">' +
      '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>' +
    '</div>'
  );
}

/**
 * Create a modal
 *
 * @param identifier
 * @param className
 * @param fullscreen
 * @param title
 * @param body
 * @param footer
 *
 * @returns {string}
 */
function createModal(
  identifier,
  className,
  fullscreen,
  title,
  body,
  footer
) {
  fullscreen = fullscreen ? 'modal-fullscreen' : '';
  footer = footer ? footer : '';

  return '<div id="'+ className + '-' + identifier + '" class="modal fade ' + fullscreen + ' ' + className + '">' +
      '<div class="modal-dialog" role="document">' +
        '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h4 class="modal-title">' + title + '</h4>' +
          '</div>' +
          '<div class="modal-body">' + body + '</div>' +
          '<div class="modal-footer">' +
            footer +
          '</div>'+
        '</div>' +
      '</div>' +
    '</div>'
  ;
}

/**
 * Create the raw modal
 *
 * @param identifier
 *
 * @returns {string}
 */
function createRawModal(identifier) {
  return createModal(
    identifier,
    'raw-mode-modal',
    true,
    'Editor in raw mode',
    '<editor-raw :fields="fields" @generated="updateFields"></editor-raw><br>'
  );
}

/**
 * Create the simple modal
 *
 * @param identifier
 *
 * @returns {string}
 */
function createSimpleModal(identifier) {
  return createModal(
    identifier,
    'simple-visual-mode-modal',
    true,
    'Simple visual mode',
    '<editor-simple :fields="fields"></editor-simple>',
    '<em>All your changes are automatically saved</em>'
  );
}

/**
 * Create the advanced modal
 *
 * @param identifier
 *
 * @returns {string}
 */
function createAdvancedModal(identifier) {
  return createModal(
    identifier,
    'advanced-visual-mode-modal',
    true,
    'Advanced visual mode',
    '<editor-advanced :fields="fields"></editor-advanced>',
    '<button class="btn btn-primary trigger-overview-modal-' + identifier + '">' +
    'Display the overview <i class="fa fa-eye"></i>' +
    '</button>' +
    '<em>All your changes are automatically saved</em>'
  )
}

/**
 * Create the overview modal
 *
 * @param identifier
 *
 * @returns {string}
 */
function createOverviewModal(identifier) {
  return createModal(
    identifier,
    'overview-modal',
    false,
    'Overview',
    '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>'
  )
}