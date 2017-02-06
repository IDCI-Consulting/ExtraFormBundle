$(window).on('load', function() {

  /** Display options related js **/

  var $extraFormFields = $('.editor-simple');

  $extraFormFields.on('click', '.field-options > label', function(event) {
    event.stopImmediatePropagation(); // prevent the click for being triggered multiple times
    $(this).parent().toggleClass('show');
  });

  $extraFormFields.on('click', '.field-constraint-options > label', function(event) {
    event.stopImmediatePropagation();
    $(this).parent().toggleClass('show');
  });

  /** Modal related js **/

  var modals = ['simple-visual-mode-modal', 'advanced-visual-mode-modal', 'raw-mode-modal'];

  modals.forEach(function(modal) {
    $(document).on('click', 'button.trigger-' + modal, function(event) {
      event.preventDefault();
      $modal = $(this).siblings('.' + modal).first();
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