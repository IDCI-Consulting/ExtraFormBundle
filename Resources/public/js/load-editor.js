/**
 * Editor configuration
 */
var extraFormEditorConfiguration = {
  'enableTextareaOutput': true
};

/**
 * Look for textareas with the editorable class, and replace them with the editor application base html
 * Then, trigger the function to start the vuejs magic
 */
$(window).on('load', function() {

  $('textarea.editorable').each(function() {
    var textareaValue = $(this).val();

    $(this).replaceWith(
      '<div class="editorApp" data-configuration-variable="extraFormEditorConfiguration">' +
        '<textarea-output v-if="configuration.enableTextareaOutput" :fields="fields" :initialoutput="initialOutput" @generated="updateFields"></textarea-output><br>' +
        '<editor :fields="fields"></editor>' +
      '</div>'
    );

    triggerEditor('div.editorApp', textareaValue, extraFormEditorConfiguration);
  });

});