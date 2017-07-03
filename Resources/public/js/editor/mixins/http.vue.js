/**
 * Global methods used to perform http requests in components
 */

export default {

  methods: {

    /**
     * Handle a get request : perform an http request and cache the json response body in the store
     *
     * @param url : string
     * @param callback : function with the json as parameter
     *
     * @returns Object : the json response
     */
    handleGetRequest: function (url, callback) {
      var self = this;
      var cachedResource = this.$store.getters.getCachedResource(url);

      if (cachedResource) {
        return callback(cachedResource);
      }

      this.$http
        .get(url)
        .then(
          function (response) {
            return response.json();
          },
          function () {
            return null;
          }
        )
        .then(function (json) {
          self.$store.commit({
            type: 'cache',
            api_url: url,
            api_response: json
          });

          return callback(json);
        })
      ;
    }
  }

};
