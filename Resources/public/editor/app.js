  Vue.use(VueResource);

  function log(message) {
    console.log(JSON.stringify(message, null, 4));
  }

  new Vue({

    el: '#editorApp',
    data: {
      fields: []
    },

    components: {
      'textarea-output': textareaOutput
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
