/* exported triggerVueEditor */

/**
 * The function that will trigger the editor
 *
 * @param element {string|Object} The dom element to trigger the editor
 * @param formProperties : Object containing the properties of the default form
 * @param configuration : Object containing the editor configuration (api url, etc)
 */
function triggerVueEditor (element, formProperties, configuration) {

  /* global Vue VueMultiselect VueResource Vuex */
  Vue.component('Multiselect', VueMultiselect.default);
  Vue.use(VueResource);

  /**
   * The common state
   */
  var store = new Vuex.Store({

    state: {
      configuration: configuration,
      formProperties: formProperties,
      configuredTypes: [],
      types: [],
      apiCache: {}
    },

    /* global extraFormEditorGetters */
    getters: extraFormEditorGetters,

    /* global extraFormEditorMutations */
    mutations: extraFormEditorMutations

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

    /* global httpMixin */
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
