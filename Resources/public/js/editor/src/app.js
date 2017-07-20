
import Vue from 'vue';
import Vuex from 'vuex';
import Multiselect from 'vue-multiselect';
import VueResource from 'vue-resource';
import extraFormEditorGetters from './store/getters.js';
import extraFormEditorMutations from './store/mutations.js';
import extraFormEditorActions from './store/actions.js';
import formEditorRawComponent from './components/editor-raw.vue';
import formEditorAdvancedComponent from './components/editor-advanced/editor.vue';
import modalComponent from './components/common/modal.vue';

Vue.component('form-editor-raw', formEditorRawComponent);
Vue.component('form-editor-advanced', formEditorAdvancedComponent);
Vue.component('modal', modalComponent);
Vue.component('multiselect', Multiselect);

/**
 * The function that will trigger the editor
 *
 * @param element {string|Object} The dom element to trigger the editor
 * @param configuration : Object containing the editor configuration (api url, etc)
 * @param [formProperties] : Object containing the properties of the default form
 */
function triggerVueEditor (element, configuration, formProperties) {

  Vue.use(Vuex);
  Vue.use(VueResource);
  Vue.use(Multiselect);

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

    getters: extraFormEditorGetters,
    mutations: extraFormEditorMutations,
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
      if (this.$store.getters.showConfiguredTypes) {
        extraFormEditorStore.dispatch('setConfiguredExtraFormTypes', this.$http);
      }
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

export { triggerVueEditor }
