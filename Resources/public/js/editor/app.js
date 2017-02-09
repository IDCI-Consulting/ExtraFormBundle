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
      formProperties: formProperties
    },
    getters: {
      extraFormTypesApiUrl: function(state) {
        return state.configuration.api_url.extra_form_types;
      },
      extraFormTypeOptionsApiUrl: function(state) {
        return function(type) {
          return state.configuration.api_url.extra_form_type_options.replace('XTYPE', type);
        }
      },
      extraFormConstraintsApiUrl: function(state) {
        return state.configuration.api_url.extra_form_constraints;
      }
    }
  });

  /*Vue.http.interceptors.push(function (request, next) {
    if (request.method.toLowerCase() === 'get') {
      var cache = sessionStorage.getItem('cache_' + request.url);
      if (cache) {
        console.log('Cache hit', request.url);
        next(request.respondWith(cache, { status: 200, statusText: 'Ok'} ));

        return;
      } else {
        console.log('Cache miss', request.url);
      }
    }

    next(function(response) {
      if (typeof(response.headers.map['Content-Type']) !== 'undefined') {
        if (response.status === 200 && request.method.toLowerCase() === 'get') {
          console.log('Cache save', request.url);
          sessionStorage.setItem('cache_' + request.url, JSON.stringify(response.body));
        }
      }

      request.respondWith(response.body, {
        status: response.status,
        statusText: response.statusText
      })
    });
  });*/

  /**
   * The app
   */
  new Vue({
    el: element,
    store: store,
    data: {
      fields: []
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