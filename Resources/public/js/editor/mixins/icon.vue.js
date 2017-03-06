/* exported fontAwesomeIconMixin */

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
    getFontAwsomeIconClass: function (icon) {
      if (typeof icon !== 'undefined') {
        return 'fa-icon fa fa-' + icon;
      }

      return 'fa-icon fa fa-circle-o';
    }
  }

};
