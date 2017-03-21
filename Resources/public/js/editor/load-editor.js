/* global extraQuery */

window.loadExtraFormEditor = function () {

  /**
   * Create the editor for each textareas with the class extra form editor
   */
  extraQuery('textarea.extra-form-editor').each(function (index) {

    /* global createAttributeMapObject */

    // Retrieve the textarea attributes and value
    var formProperties = createAttributeMapObject(this);
    var editorComponentId = 'editorComponent' + index;
    var availableModes = formProperties['data-available-modes'].split('__');
    var configuration = window[formProperties['data-configuration-variable']];
    var rawModal = createRawModal(index);
    var rawModalButton = '<button class="trigger-raw-mode-modal-' + index + '">Raw mode</button>';
    var simpleModal = '';
    var simpleModalButton = '';
    var advancedModal = '';
    var overviewModal = '';
    var advancedModalButton = '';

    if (availableModes.indexOf('simple') > -1) {
      simpleModal = createSimpleModal(index);
      simpleModalButton =
        '<button class="trigger-simple-visual-mode-modal-' + index + '">' +
          'Simple visual mode' +
        '</button>'
      ;
    }

    if (availableModes.indexOf('advanced') > -1) {
      advancedModal = createAdvancedModal(index);
      overviewModal = createOverviewModal(index);
      advancedModalButton =
        '<button class="trigger-advanced-visual-mode-modal-' + index + '">' +
          'Advanced visual mode' +
        '</button>'
      ;
    }

    /**
     * Insert buttons in place of the textarea
     */
    extraQuery(this).after(
      '<div class="modal-buttons">' +
         simpleModalButton + ' ' + advancedModalButton + ' ' + rawModalButton +
      '</div>'
    );

    // Insert the modals editor at the end of the body
    var $body = extraQuery('body');

    $body.append(
      '<div id="' + editorComponentId + '">' + rawModal + simpleModal + advancedModal + overviewModal + '</div>'
    );

    // Hide the initial textarea
    this.style.display = 'none';

    // Display / Hide the modals
    var modalTypes = [
      'simple-visual-mode-modal',
      'advanced-visual-mode-modal',
      'raw-mode-modal',
      'overview-modal'
    ];

    modalTypes.forEach(function (modalType) {
      showModalOnClick(modalType, index);
    });

    modalTypes.forEach(function (modalType) {
      hideModalOnClick(modalType);
    });

    getFormOverviewOnClick(configuration.extra_form_editor_overview_url, index);
    resetFormOverviewModalOnClose(index);
    submitFormOverviewOnClick(index);
    colorEmptyRequiredInputs();
    showOrHideSimpleEditorOptions();

    /* global triggerVueEditor */
    triggerVueEditor('#' + editorComponentId, formProperties, configuration);

    /**
     * Show or hide options on the simple editor
     */
    function showOrHideSimpleEditorOptions () {
      var $simpleEditor = extraQuery('.editor-simple');

      $simpleEditor.on('click', '.field-options > label', function (event) {
        // Prevent the click for being triggered multiple times
        event.stopImmediatePropagation();
        extraQuery(this)
          .parent()
          .toggleClass('show')
        ;
      });

      $simpleEditor.on('click', '.field-constraint-options > label', function (event) {
        event.stopImmediatePropagation();
        extraQuery(this)
          .parent()
          .toggleClass('show')
        ;
      });
    }

    /**
     * Add some colors on empty required inputs
     */
    function colorEmptyRequiredInputs () {
      extraQuery(document).on('change', '.extra-form-inputs-required input[required="required"]', function () {
        if (extraQuery(this).val()) {
          extraQuery(this).css({
            'border-color': '#cccccc',
            'background-color': '#ffffff'
          });
        } else {
          extraQuery(this).css({
            'border-color': '#c9302c',
            'background-color': '#f3d9d9'
          });
        }
      });
    }

    /**
     * Show modal on click on trigger button
     *
     * @param modalType
     * @param modalIdentifier
     */
    function showModalOnClick (modalType, modalIdentifier) {
      extraQuery(document).on('click', 'button.trigger-' + modalType + '-' + modalIdentifier, function (event) {
        event.preventDefault();
        var $modal = extraQuery('#' + modalType + '-' + modalIdentifier);

        if ('overview-modal' !== modalType) {
          $modal = $modal.first();
        }

        $modal.modal('show');
      });
    }

    /**
     * Hide modal on click on close button
     *
     * @param modalType
     */
    function hideModalOnClick (modalType) {
      var classes =
        // On the generate field button from the editor-raw
        '.' + modalType + ' .modal-body button.close-modal, ' +

          // On the upper right cross of the modal
        '.' + modalType + ' .modal-footer > button.close-modal, ' +

          // On the close button on the left bottom of the modal
        '.' + modalType + ' .modal-header > button.close';

      extraQuery(document).on('click', classes, function (event) {
        event.preventDefault();
        extraQuery(this)
          .closest('.modal')
          .modal('hide')
        ;
      });
    }

    /**
     * Get the form overview on click on the trigger button
     *
     * @param url
     */
    function getFormOverviewOnClick (url) {

      /**
       * Get the form overview
       *
       * @param callback
       */
      function getFormOverview (callback) {

        var raw =
          extraQuery('#raw-mode-modal-' + index + ' textarea')
            .first()
            .val();

        var request = extraQuery.ajax({
          url: url,
          method: 'POST',
          data: {
            overview: {
              configuration: raw
            }
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

      extraQuery(document).on('click', 'button.trigger-overview-modal-' + index, function () {
        setTimeout(function () {
          getFormOverview(function (content) {
            if (content.success) {
              extraQuery('#overview-modal-' + index + ' .modal-body').replaceWith(
                '<div class="modal-body">' + content.data + '</div>'
              );
            } else {
              extraQuery('#overview-modal-' + index + ' .modal-body').replaceWith(
                '<div class="modal-body">' +
                  '<div>' + content.data.responseText + '</div>' +
                '</div>'
              );
            }
          });
        }, 800);
      });
    }

    /**
     * Submit the form overview on click
     */
    function submitFormOverviewOnClick () {

      extraQuery(document).on('click', '#overview-modal-' + index + ' form button[type=\'submit\']', function (event) {
        event.preventDefault();
        resetFormOverviewModal(index);
        var $form = extraQuery(this).closest('form');

        setTimeout(function () {

          submitForm($form, function (content) {
            if (content.success) {
              if (content.data) {
                extraQuery('#overview-modal-' + index + ' .modal-body').replaceWith(
                  '<div class="modal-body">' + content.data + '</div>'
                );
              }
            } else {
              extraQuery('#overview-modal-' + index + ' .modal-body').replaceWith(
                '<div class="modal-body">' +
                  '<div>' + content.data.responseText + '</div>' +
                '</div>'
              );
            }
          });
        }, 800);
      });
    }

    /**
     * Reset the content of the overview modal when it's closed
     */
    function resetFormOverviewModalOnClose () {
      extraQuery(document).on('hidden.bs.modal', '#overview-modal-' + index, function () {
        resetFormOverviewModal(index);
      });
    }

    /**
     * Reset the content of the overview modal
     */
    function resetFormOverviewModal () {
      extraQuery('#overview-modal-' + index + ' .modal-body').replaceWith(
        '<div class="modal-body">' +
          '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>' +
        '</div>'
      );
    }

    /**
     * Submit a form in ajax
     *
     * @param $form
     * @param callback
     */
    function submitForm ($form, callback) {
      var request = extraQuery.ajax({
        url: $form.attr('action'),
        method: $form.attr('method'),
        data: $form.serialize()
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

    /**
     * Create a modal
     *
     * @param id
     * @param name
     * @param extraClasses
     * @param title
     * @param body
     * @param [modalFooter]
     *
     * @returns {string}
     */
    function createModal (id, name, extraClasses, title, body, modalFooter) {
      var footer = modalFooter ? modalFooter : '';

      return '<div id="' + name + '-' + id + '" class="editor-modal modal fade ' + extraClasses + ' ' + name + '">' +
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
              '<div class="modal-header">' +
                '<button type="button" class="close" aria-label="Close">' +
                  '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '<h4 class="modal-title">' + title + '</h4>' +
              '</div>' +
              '<div class="modal-body">' + body + '</div>' +
              '<div class="modal-footer">' +
                  footer +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
      ;
    }

    /**
     * Create the raw modal
     *
     * @returns {string}
     */
    function createRawModal () {
      return createModal(
        index,
        'raw-mode-modal',
        'modal-fullscreen',
        'Editor in raw mode',
        '<editor-raw :fields="fields" @generated="updateFields"></editor-raw><br>'
      );
    }

    /**
     * Create the simple modal
     *
     * @returns {string}
     */
    function createSimpleModal () {
      return createModal(
        index,
        'simple-visual-mode-modal',
        'modal-fullscreen',
        'Simple visual mode',
        '<editor-simple :fields="fields"></editor-simple>',
        '<em>All your changes are automatically saved</em>'
      );
    }

    /**
     * Create the advanced modal
     *
     * @returns {string}
     */
    function createAdvancedModal () {
      return createModal(
        index,
        'advanced-visual-mode-modal',
        'modal-fullscreen',
        'Advanced visual mode',
        '<editor-advanced :fields="fields"></editor-advanced>',
        '<button class="btn btn-primary trigger-overview-modal-' + index + '">' +
        'Display the overview <i class="fa fa-eye"></i>' +
        '</button>' +
        '<em>All your changes are automatically saved</em>'
      );
    }

    /**
     * Create the overview modal
     *
     * @returns {string}
     */
    function createOverviewModal () {
      return createModal(
        index,
        'overview-modal',
        'extra-form-inputs-required',
        'Overview',
        '<div style="text-align: center;"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i></div>'
      );
    }

  });

};
