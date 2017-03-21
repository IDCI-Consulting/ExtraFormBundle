/* exported extraFormEditorActions */
var extraFormEditorActions = {

  /**
   * Handle a get request : perform an http request and cache the json response body in the store
   *
   * @param url
   * @param $store
   * @param $http
   * @param callback : function with the json as parameter
   *
   * @returns Object : the json response
   */
  handleGetRequest: function (url, $store, $http, callback) {
    var cachedResource = $store.getters.getCachedResource(url);

    if (cachedResource) {
      return callback(cachedResource);
    }

    $http
      .get(url)
      .then(
        function (response) {
          return response.json();
        }
      )
      .then(
        function (json) {
          $store.commit({
            type: 'cache',
            api_url: url,
            api_response: json
          });

          return callback(json);
        }, function () {
          return callback();
        }
      )
    ;
  },

  /**
   * Set the step types in the store
   *
   * @param $store
   * @param $http
   */
  setBaseExtraFormTypes: function ($store, $http) {
    var url = $store.getters.getBaseExtraFormTypesApiUrl;

    extraFormEditorActions.handleGetRequest(url, $store, $http, function (types) {
      $store.commit('setBaseExtraFormTypes', types);
    });
  },

  /**
   * Set the step configured types in the store
   *
   * @param $store
   * @param $http
   */
  setConfiguredExtraFormTypes: function ($store, $http) {
    var url = $store.getters.getConfiguredExtraFormTypesApiUrl;

    extraFormEditorActions.handleGetRequest(url, $store, $http, function (configuredTypes) {
      if (typeof configuredTypes !== 'undefined') {
        for (var i = 0, len = configuredTypes.length; i < len; i++) {
          if ('string' === typeof configuredTypes[i].configuration) {
            configuredTypes[i].configuration = JSON.parse(configuredTypes[i].configuration);
          }
          // Jms serialization issue: https://github.com/schmittjoh/JMSSerializerBundle/issues/271
          if (configuredTypes[i].extra_form_options.length < 1) {
            // When the value is []
            configuredTypes[i].extra_form_options = {};
          }
        }
      }

      $store.commit('setConfiguredExtraFormTypes', configuredTypes);
    });
  }

};
