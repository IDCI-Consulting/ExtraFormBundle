$(document).ready(function() {
  $('#extra-form-fields').on('click', '.field-options > label', function() {
    $(this).parent().toggleClass('show');
  });

  $('#extra-form-fields').on('click', '.field-constraint-options > label', function() {
    $(this).parent().toggleClass('show');
  });
});