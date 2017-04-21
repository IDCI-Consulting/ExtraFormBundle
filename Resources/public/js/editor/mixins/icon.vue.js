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
     * @param [type]
     *
     * @returns string
     */
    getFontAwsomeIconClass: function (icon, type) {
      if (typeof icon !== 'undefined') {
        return 'fa-icon fa fa-' + icon;
      }

      if (typeof type !== 'undefined') {
        icon = this.$store.getters.getExtraFormTypeIcon(type);

        if (null !== icon) {
          return 'fa-icon fa fa-' + icon;
        }
      }

      return 'fa-icon fa fa-circle-o';
    }
  }

};
