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
    // close the modal on click on the upper right cross and on the close button on the left bottom
    $(document).on('click', '.close-' + modal + ', .' + modal + ' .modal-header > button.close', function(event) {
      event.preventDefault();
      $(this).closest('.modal').modal('hide');
    });
  });
});