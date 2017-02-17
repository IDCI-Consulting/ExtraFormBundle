/**
 * The function that will trigger the editor
 *
 * @param element : string|Object the dom element to trigger the editor
 * @param formProperties : Object containing the properties of the default form
 * @param configuration : Object containing the editor configuration (api url, etc)
 */
function triggerEditor(element, formProperties, configuration) {

  Vue.component('Multiselect', VueMultiselect.default);
  Vue.use(VueResource);

  /**
   * The common state
   */
  const store = new Vuex.Store({

    state: {
      configuration: configuration,
      formProperties: formProperties,
      configuredTypes: [],
      types: [],
      apiCache: {}
    },

    getters: {
      configuredExtraFormTypesApiUrl: function(state) {
        return state.configuration.api_url.get_configured_extra_form_types;
      },
      extraFormTypesApiUrl: function(state) {
        return state.configuration.api_url.get_extra_form_types;
      },
      postConfiguredExtraFormTypesApiUrl: function(state) {
        return state.configuration.api_url.post_configured_extra_form_types;
      },
      putConfiguredExtraForTypesApiUrl: function(state) {
        return function(name) {
          return state.configuration.api_url.put_configured_extra_form_types.replace('XNAME', name);
        }
      },
      deleteConfiguredExtraForTypesApiUrl: function(state) {
        return function(name) {
          return state.configuration.api_url.delete_configured_extra_form_types.replace('XNAME', name);
        }
      },
      extraFormTypeOptionsApiUrl: function(state) {
        return function(type) {
          return state.configuration.api_url.get_extra_form_type_options.replace('XTYPE', type);
        }
      },
      extraFormConstraintsApiUrl: function(state) {
        return state.configuration.api_url.get_extra_form_constraints;
      },
      getCachedResource: function(state) {
        return function(url) {
          return state.apiCache[url];
        }
      },
      getConfiguredTypes: function(state) {
        return state.configuredTypes;
      },
      getTypes: function(state) {
        return state.types;
      }
    },

    mutations: {
      cache: function(state, payload) {
        state.apiCache[payload.api_url] = payload.api_response;
      },
      setConfiguredTypes: function(state, types) {
        state.configuredTypes = types;
      },
      addConfiguredType: function(state, type) {
        state.configuredTypes.push(type);
      },
      removeConfiguredType: function(state, index) {
        state.configuredTypes.splice(index, 1);
      },
      updateConfiguredType: function(state, type) {
        for (var i = 0, len = state.configuredTypes.length; i < len; i++) {
          if (state.configuredTypes[i].name === type.name) {
            state.configuredTypes.splice(i, 1);
            state.configuredTypes.push(type);

            return; // avoid too keep looping over a spliced array
          }
        }
      },
      setTypes: function(state, types) {
        state.types = types;
      }
    }

  });

  /**
   * The app
   */
  new Vue({

    el: element,

    store: store,

    data: {
      fields: []
    },

    mixins: [httpMixin],

    methods: {

      /**
       * Update the fields
       *
       * @param fields
       */
      updateFields: function (fields) {
        this.$set(this, 'fields', fields);
      }
    }

  });
}