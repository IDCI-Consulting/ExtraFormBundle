/* exported extraFormEditorGetters */

var extraFormEditorGetters = {

  editorId: function (state) {
    return state.configuration.editorId;
  },

  configuredFieldEditionAllowed: function (state) {
    return state.configuration.allow_configured_type_edition;
  },

  configuredExtraFormTypesApiUrl: function (state) {
    return state.configuration.api_url.get_configured_extra_form_types;
  },

  extraFormTypesApiUrl: function (state) {
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

  extraFormTypeOptionsApiUrl: function (state) {
    return function (type) {
      return state.configuration.api_url.get_extra_form_type_options.replace('XTYPE', type);
    };
  },

  extraFormConstraintsApiUrl: function (state) {
    return state.configuration.api_url.get_extra_form_constraints;
  },

  getCachedResource: function (state) {
    return function (url) {
      return state.apiCache[url];
    };
  },

  getConfiguredTypes: function (state) {
    return state.configuredTypes;
  },

  getTypes: function (state) {
    return state.types;
  }

};