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
  var extraFormEditorStore = new Vuex.Store({

    state: {
      configuration: configuration,
      formProperties: formProperties,
      configuredTypes: [],
      baseTypes: [],
      apiCache: {}
    },

    /* global extraFormEditorGetters */
    getters: extraFormEditorGetters,

    /* global extraFormEditorMutations */
    mutations: extraFormEditorMutations,

    /* global extraFormEditorActions */
    actions: extraFormEditorActions

  });

  /**
   * The app
   */
  new Vue({

    el: element,

    store: extraFormEditorStore,

    data: {
      fields: []
    },

    /**
     * Call the APIs before creating the app
     */
    beforeCreate: function () {
      extraFormEditorStore.dispatch('setBaseExtraFormTypes', this.$http);
      extraFormEditorStore.dispatch('setConfiguredExtraFormTypes', this.$http);
    },

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
