/* exported extraFormEditorGetters */

var extraFormEditorGetters = {

  editorId: function (state) {
    return state.configuration.editorId;
  },

  configuredTypesEditionAllowed: function (state) {
    return state.configuration.allow_configured_types_edition;
  },

  showConfiguredTypes: function (state) {
    return state.configuration.show_configured_types;
  },

  getConfiguredExtraFormTypesApiUrl: function (state) {
    return state.configuration.api_url.get_configured_extra_form_types;
  },

  getBaseExtraFormTypesApiUrl: function (state) {
    return state.configuration.api_url.get_extra_form_types;
  },

  postConfiguredExtraFormTypesApiUrl: function (state) {
    return state.configuration.api_url.post_configured_extra_form_types;
  },

  putConfiguredExtraForTypesApiUrl: function (state) {
    return function (name) {
      return state.configuration.api_url.put_configured_extra_form_types.replace('XNAME', name);
    };
  },

  deleteConfiguredExtraForTypesApiUrl: function (state) {
    return function (name) {
      return state.configuration.api_url.delete_configured_extra_form_types.replace('XNAME', name);
    };
  },

  getExtraFormTypeOptionsApiUrl: function (state) {
    return function (type) {
      return state.configuration.api_url.get_extra_form_type_options.replace('XTYPE', type);
    };
  },

  getExtraFormConstraintsApiUrl: function (state) {
    return state.configuration.api_url.get_extra_form_constraints;
  },

  getCachedResource: function (state) {
    return function (url) {
      return state.apiCache[url];
    };
  },

  getConfiguredExtraFormTypes: function (state) {
    return state.configuredTypes;
  },

  getBaseExtraFormTypes: function (state) {
    return state.baseTypes;
  }

};
