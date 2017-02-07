/**
 * The function that will trigger the editor
 *
 * @param element : string|Object the dom element to trigger the editor
 * @param defaultTextarea : object with textarea default values
 */
function triggerEditor(element, defaultTextarea) {

  Vue.component('Multiselect', VueMultiselect.default);
  Vue.use(VueResource);

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

  new Vue({

    el: element,
    data: {
      fields: [],
      textarea: defaultTextarea,
      // default values
      configuration: {
        enableTextareaOutput: true
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