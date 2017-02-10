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
      api_cache: {}
    },

    getters: {
      configuredExtraFormTypesApiUrl: function(state) {
        return state.configuration.api_url.get_configured_extra_form_types;
      },
      extraFormTypesApiUrl: function(state) {
        return state.configuration.api_url.get_extra_form_types;
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
          return state.api_cache[url];
        }
      }
    },

    mutations: {
      cache: function(state, payload) {
        state.api_cache[payload.api_url] = payload.api_response;
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