$(window).on('load', function() {

  /** Display options related js **/

  var $extraFormFields = $('.extra-form-fields');

  $extraFormFields.on('click', '.field-options > label', function(event) {
    event.stopImmediatePropagation(); // prevent the click for being triggered multiple times
    $(this).parent().toggleClass('show');
  });

  $extraFormFields.on('click', '.field-constraint-options > label', function(event) {
    event.stopImmediatePropagation();
    $(this).parent().toggleClass('show');
  });

  /** Modal related js **/

  var $fullScreenModal = $(".modal-fullscreen");

  $fullScreenModal.on('show.bs.modal', function () {
    setTimeout( function() {
      $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    }, 0);
  });

  $fullScreenModal.on('hidden.bs.modal', function () {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
  });

  $('button.trigger-visual-mode-modal').on('click', function(event) {
    event.preventDefault();
    $modal = $(this).siblings('.visual-mode-modal').first();
    $modal.modal('show');
  });

  $('button.trigger-raw-mode-modal').on('click', function(event) {
    event.preventDefault();
    $modal = $(this).siblings('.raw-mode-modal').first();
    $modal.modal('show');
  });

  $('.generate-fields, .close-visual-mode').on('click', function(event) {
    event.preventDefault();
    $(this).closest('.modal').modal('hide');
  });

});