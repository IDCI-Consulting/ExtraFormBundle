/**
 * Global methods used to perform http requests in components
 */
var httpMixin = {

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
      var response = this.$store.getters.getCachedResource(url);
      if (response) {
        return callback(response);
      } else {
        this.$http
          .get(url)
          .then(
            function (response) {
              return response.json();
            },
            function (response) {
              console.log(response.status + ' ' + response.statusText);
            }
          )
          .then(function (json) {
            this.$store.commit({
              type: 'cache',
              api_url: url,
              api_response: json
            });

            return callback(json);
          })
        ;
      }
    }
  }

};