Vue.use(VueResource);

function log(message) {
  console.log(JSON.stringify(message, null, 4));
}

var app = new Vue({

  el: '#editorApp',
  delimiters: ['${', '}'], // avoid conflicts with twig
  data: {
    fields: []
  },

  components: {
    'new-field': newField,
    'textarea-output': textareaOutput,
    'field': field
  },

  methods: {

    /**
     * Update the fields
     *
     * @param fields
     */
    updateFields: function(fields) {
      this.$set(this, 'fields', fields);
    },

    /**
     * Add a new field
     *
     * @param event
     */
    addField: function(field) {
      //this.getExtraFormTypeOptions(this.selectedExtraFormType);
      this.fields.push(field);
    },

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function(index) {
      this.fields.splice(index, 1);
    }
  }
});




//
//Vue.component('form-type-options', {
//  delimiters: ['${', '}'],
//  props: ['type', 'index'],
//
//  data: function() {
//    return {
//      extraFormTypeOptionsHtml: {},
//      extraFormType: this.type,
//      extraFormTypeOptions: {},
//      template: null
//    }
//  },
//
//  render: function(createElement) {
//    if (!this.template) {
//      return createElement('div', 'Loading...');
//    } else {
//      console.log(this.template);
//      return this.template;
//    }
//  },
//
//  mounted: function() {
//    this.getHtmlOptions();
//  },
//
//  methods: {
//    getHtmlOptions: function() {
//      var self = this;
//      this
//        .$http.get('/extra-form-types/' + this.extraFormType + '/options.html')
//        .then(
//        function (response) {
//          var options = response.body.replace(/name=\"([a-z_]*)\"/g, "v-model=\"extraFormTypeOptions.$1\"");
//          this.$set(this.extraFormTypeOptionsHtml, this.extraFormType, options);
//          log(this.extraFormTypeOptionsHtml[this.extraFormType]);
//          self.template = '<div>dede</div>';
//        },
//        function (response) {
//          console.log(response.status + ' ' + response.statusText);
//        }
//      )
//    }
//  },
//
//  watch: {
//    extraFormTypeOptions: {
//      handler: function(newOptions) { log(newOptions) },
//      deep: true
//    }
//  }
//
//});