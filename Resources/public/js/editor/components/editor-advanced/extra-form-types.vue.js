var extraFormTypes = {

  template:
    '<div>' +
      '<button class="extra-btn" @click="createField(typeName)" :class="typeName" type="button" v-for="(type, typeName) in types">{{ typeName }}</button>' +
    '</div>'
  ,

  data: function () {
    return {
      types: []
    }
  },

  mixins: [httpMixin],

  created: function() {
    this.getExtraFormTypes();
  },

  methods: {

    /**
     * Create a new field
     */
    createField: function(value) {
      var field = {
        'name': 'field_' + value + '_' + generateUniqueId(),
        'extra_form_type': value,
        'options': {},
        'constraints': []
      };

      this.$emit('created', field);
    },

    /**
     * Get the form types
     */
    getExtraFormTypes: function() {
      var url = this.$store.getters.extraFormTypesApiUrl,
          self = this
      ;

      this.handleGetRequest(url, function (json) {
        self.types = filterObject(json, function (element) {
          return element.abstract === false;
        });
      });
    }
  }

};