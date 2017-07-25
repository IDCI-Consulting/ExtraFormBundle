
import Vue from 'vue';
import Vuex from 'vuex';
import Multiselect from 'vue-multiselect';
import VueResource from 'vue-resource';
import extraFormEditorGetters from './store/getters.js';
import extraFormEditorMutations from './store/mutations.js';
import extraFormEditorActions from './store/actions.js';
import modalComponent from './components/common/modal.vue';

import './styles/editor-common.css';

Vue.component('modal', modalComponent);
Vue.component('multiselect', Multiselect);

/**
 * Get the needed global components by checking if the tag is in the DOM
 */
function getNeededGlobalComponents () {
  var globalComponents = [];

  if (document.getElementsByTagName('form-editor-raw').length > 0) {
    globalComponents.push({
      componentName: 'form-editor-raw',
      promise: import(/* webpackChunkName: 'form-editor-raw' */ './components/editor-raw.vue')
    });
  }

  if (document.getElementsByTagName('form-editor-advanced').length > 0) {
    globalComponents.push({
      componentName: 'form-editor-advanced',
      promise: import(/* webpackChunkName: 'form-editor-advanced' */ './components/editor-advanced/editor.vue')
    });
  }

  return globalComponents;
}

/**
 * The function that will trigger the editor
 *
 * @param element {string|Object} The dom element to trigger the editor
 * @param configuration : Object containing the editor configuration (api url, etc)
 * @param [formProperties] : Object containing the properties of the default form
 */
function triggerVueEditor (element, configuration, formProperties) {

  var globalComponents = getNeededGlobalComponents();
  var promises = globalComponents.map(function(component) {
    return component.promise;
  });

  Promise.all(promises).then(function(components) {

    // We declare only the global components we need
    for (var i = 0; i < components.length; i++) {
      Vue.component(globalComponents[i].componentName, components[i].default);
    }

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

  });

}

export { triggerVueEditor }
