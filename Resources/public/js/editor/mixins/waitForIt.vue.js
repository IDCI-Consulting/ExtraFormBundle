/**
 * Mixin adding a method allowing to avoid calling a function too many times
 * For example, when a user press a key, wait for the user to do a pause before triggering some process
 */
export default {

  data: function () {
    return {
      timeout: null
    };
  },

  methods: {

    /**
     * Delay the trigger of a callback until this function is not called for a given time
     *
     * @param callback
     * @param time
     */
    waitForIt: function (callback, time) {
      if ('undefined' === typeof time) {
        time = 500;
      }

      clearTimeout(this.timeout);

      this.timeout = setTimeout(callback, time);
    }
  }
};
