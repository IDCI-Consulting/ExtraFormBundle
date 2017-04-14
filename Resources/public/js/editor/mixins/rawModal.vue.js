/* global $ */

/**
 * Global methods for the raw editor modals
 */
/* exported rawModalMixin */
var rawModalMixin = {

  methods: {

    /**
     * Close the modal
     *
     * @param event - the event triggered by the click on the button
     */
    closeModal: function (event) {
      if (typeof event !== 'undefined') {
        $(event.target)
          .closest('.modal')
          .modal('hide')
        ;

        // Remove last errors
        $(event.target)
          .siblings('.json-errors')
          .empty()
        ;
      }
    },

    /**
     * Display the errors caused by json parse
     *
     * @param event
     * @param error
     */
    displayJsonParseErrors: function (event, error) {
      if (typeof event !== 'undefined') {
        $(event.target)
          .siblings('.json-errors')
          .text('There are errors in your json : ' + error)
        ;
      }
    }

  }

};


