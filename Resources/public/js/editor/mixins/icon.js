/**
 * Global methods used to get icons
 */
var fontAwesomeIconMixin = {

  methods: {

    /**
     * Get the font awesome icon class from the icon value
     *
     * @param icon
     *
     * @returns string
     */
    getFontAwsomeIconClass: function(icon) {
      return typeof icon !== 'undefined' ?
        'fa-icon fa fa-' + icon :
        'fa-icon fa fa-circle-o'
      ;
    }
  }

};