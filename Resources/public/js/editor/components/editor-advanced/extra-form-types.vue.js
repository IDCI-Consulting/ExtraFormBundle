var extraFormTypes = {

  template:
      '<div>' +
          '<div>' +
              '<ul class="nav nav-pills" role="tablist">' +
                  '<li role="presentation" class="active">' +
                      '<a role="tab" data-toggle="tab" href="#basic-types">Basic types</a>' +
                  '</li>' +
                  '<li role="presentation">'+
                      '<a role="tab" data-toggle="tab" href="#configured-types">Configured types</a>' +
                  '</li>' +
              '</ul>' +
              '<div class="tab-content">' +
                  '<div role="tabpanel" class="tab-pane in active" id="basic-types">' +
                      '<button class="extra-btn" @click="createField(type, typeName)" :class="typeName" type="button" v-for="(type, typeName) in types">' +
                          '<i :class="getFontAwsomeIconClass(type.icon)" aria-hidden="true"></i> {{ typeName }}' +
                      '</button>' +
                  '</div>' +
                  '<div role="tabpanel" class="tab-pane" id="configured-types">' +
                    '<button ' +
                        'class="extra-btn" ' +
                        '@click="createConfiguredField(configuredType)" ' +
                        ':class="configuredType.configuration.extra_form_type" ' +
                        'type="button" ' +
                        'v-for="configuredType in configuredTypes"' +
                    '>' +
                        '<i :class="getFontAwsomeIconClass()" aria-hidden="true"></i> {{ configuredType.name }}' +
                    '</button>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</div>'
  ,


  data: function () {
    return {
      types: [],
      configuredTypes: []
    }
  },

  mixins: [httpMixin, fontAwesomeIconMixin, fieldsMixins],

  created: function() {
    this.getExtraFormTypes();
    this.getConfiguredExtraFormTypes();
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
     * Create a new configured field
     */
    createConfiguredField: function(type) {

      var field = {
        'name': 'field_' + type.name + '_' + generateUniqueId(),
        'extra_form_type': type.configuration.extra_form_type,
        'options': type.configuration.options,
        'constraints': type.configuration.constraints
      };

      if (typeof field.options.configuration === 'object') {
        field.options.configuration = this.createFieldsRecursively(field.options.configuration);
      }

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
    },

    /**
     * Get the configured form types
     */
    getConfiguredExtraFormTypes: function() {
      var url = this.$store.getters.configuredExtraFormTypesApiUrl,
          self = this
      ;

      this.handleGetRequest(url, function (configuredTypes) {
        for (var i = 0, len = configuredTypes.length; i < len; i++) {
          if (typeof configuredTypes[i].configuration === 'string') {
            configuredTypes[i].configuration = JSON.parse(configuredTypes[i].configuration);
          }
        }

        self.configuredTypes = configuredTypes;
      });
    }

  }

};