$(window).on('load', function() {

  var $extraFormFields = $('.extra-form-fields');

  $extraFormFields.on('click', '.field-options > label', function() {
    $(this).parent().toggleClass('show');
  });

  $extraFormFields.on('click', '.field-constraint-options > label', function() {
    $(this).parent().toggleClass('show');
  });

});