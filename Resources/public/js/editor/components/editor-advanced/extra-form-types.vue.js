var extraFormTypes = {

  template:
    '<div>' +
      '<button class="extra-btn" @click="createField(type, typeName)" :class="typeName" type="button" v-for="(type, typeName) in types">' +
        '<i :class="getFontAwsomeIconClass(type.icon)" aria-hidden="true"></i> {{ typeName }}' +
      '</button>' +
    '</div>'
  ,

  data: function () {
    return {
      types: []
    }
  },

  mixins: [httpMixin, fontAwesomeIconMixin],

  created: function() {
    this.getExtraFormTypes();
  },

  methods: {

    /**
     * Create a new field
     */
    createField: function(type, typeName) {
      var field = {
        'name': 'field_' + typeName + '_' + generateUniqueId(),
        'icon': type.icon,
        'extra_form_type': typeName,
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