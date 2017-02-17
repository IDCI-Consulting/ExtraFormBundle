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
                      '<basic-extra-form-type ' +
                          '@created="createField" ' +
                          ':type="basicType" ' +
                          'v-for="basicType in basicTypes"' +
                      '>' +
                      '</basic-extra-form-type>' +
                  '</div>' +
                  '<div role="tabpanel" class="tab-pane" id="configured-types">' +
                      '<configured-extra-form-type ' +
                          '@delete="deleteConfiguredType" ' +
                          '@created="createConfiguredField" ' +
                          ':type="configuredType" ' +
                          'v-for="configuredType in configuredTypes"' +
                      '> ' +
                      '</configured-extra-form-type>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</div>'
  ,

  data: function () {
    return {
      modal: {
        show: false
      }
    }
  },

  computed: {
    configuredTypes: function() {
      return this.$store.getters.getConfiguredTypes;
    },
    basicTypes: function() {
      return this.$store.getters.getTypes;
    }
  },

  components: {
    'configured-extra-form-type': configuredExtraFormType,
    'basic-extra-form-type': basicExtraFormType
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
    createField: function(type) {
      var field = {
        'name': 'field_' + type.name + '_' + generateUniqueId(),
        'icon': type.icon,
        'extra_form_type': type.name,
        'options': {},
        'constraints': []
      };

      this.$emit('created', field);
    },

    /**
     * Delete a configured type
     */
    deleteConfiguredType: function(type) {
      this
        .$http.delete(this.$store.getters.deleteConfiguredExtraForTypesApiUrl(type.name))
        .then(
          function () {
            // delete the type from the configured types
            for (var i = 0, len = this.configuredTypes.length; i < len; i++) {
              if (this.configuredTypes[i].name === type.name) {
                this.$store.commit('removeConfiguredType', i);

                return; // avoid too keep looping over a sliced array
              }
            }
          },
          function (response) {} // todo handle errors
        )
      ;
    },

    /**
     * Create a new configured field
     */
    createConfiguredField: function(type) {

      var options = {};
      for (var optionName in type.extra_form_options) {
        if (type.extra_form_options.hasOwnProperty(optionName)) {
          if (typeof (type.extra_form_options[optionName]['options']['data']) !== "undefined") {
            options[optionName] = type.extra_form_options[optionName]['options']['data'];
          }
        }
      }

      var field = {
        'name': 'field_' + type.name + '_' + generateUniqueId(),
        'icon': type.icon,
        'extra_form_type': type.form_type_name,
        'options':  options,
        'constraints': type.extra_form_constraints
      };

      // case where the fields contains an extra form builder with a configuration option that contains fields, and so on and so on
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
        var types = json.filter(function (element) {
          return element.abstract === false;
        });

        self.$store.commit('setTypes', types);
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
          // Jms serialization issue: https://github.com/schmittjoh/JMSSerializerBundle/issues/271
          if (configuredTypes[i].extra_form_options.length < 1) {
            configuredTypes[i].extra_form_options = {}; // when the value is []
          }
        }

        self.$store.commit('setConfiguredTypes', configuredTypes);
      });
    }

  }

};