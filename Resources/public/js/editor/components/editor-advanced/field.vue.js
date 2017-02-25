/* exported editorAdvancedField */
var editorAdvancedField = {

  template:
    '<div :class="activeClass" @click="setActiveClass(index)">' +
      '<button @click.prevent="removeField(index)" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' +
      '<i class="fa fa-arrows-alt"></i>' +
      '<i v-if="configuredFieldEditionAllowed" title="Save this field as a configured type" @click="openSaveModal" class="fa fa-floppy-o"></i>' +
      '<strong>{{ field.extra_form_type }}</strong><i :class="getFontAwsomeIconClass(field.icon)" aria-hidden="true"></i><br>' +
      '<span>Name: <input class="field-name-input" type="text" v-model="field.name" pattern="/^([a-z][0-9])+$/" /></span>' +
      '<modal v-if="modal.show">' +
        '<h3 slot="header">Save this configured field' +
          '<button @click="closeSaveModal" type="button" class="close" aria-label="Close">&times;</button>' +
        '</h3>' +
        '<div slot="body" v-html="modal.content"></div>' +
          '<div slot="footer">' +
            '<div v-if="modal.type == \'save\'">' +
              '<button @click="saveConfiguredType(field)" type="button" class="extra-btn" aria-label="Save">Save</button>' +
            '</div>' +
            '<div v-if="modal.type == \'put\'">' +
              '<button @click="updateConfiguredType(field)" type="button" class="extra-btn" aria-label="Save">Update</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</modal>' +
    '</div>'
  ,

  props: ['field', 'index'],

  data: function() {
    return {
      modal: null
    }
  },

  created: function() {
    this.setInitialSaveModal();
  },

  computed: {
    activeClass: function() {
      var active = this.field.active ? 'active' : 'inactive';

      return 'field ' + active;
    },
    configuredFieldEditionAllowed: function() {
      return this.$store.getters.configuredFieldEditionAllowed;
    }
  },

  mixins: [fontAwesomeIconMixin],

  watch: {
    field: {
      handler: function() {
        this.modal.content =
          '<div><i class="' + this.getFontAwsomeIconClass(this.field.icon) +'" aria-hidden="true"></i></div>' +
          '<div>Type: <strong>' + this.field.extra_form_type + '</strong></div>' +
          '<div>Name: <strong>' + this.field.name + '</strong></div>'
      },
      deep: true
    }
  },

  methods: {

    /**
     * The the initial content and type of the save modal
     */
    setInitialSaveModal: function() {
      this.modal = {
        show: false,
        type: 'save',
        content:
          '<div><i class="' + this.getFontAwsomeIconClass(this.field.icon) +'" aria-hidden="true"></i></div>' +
          '<div>Type: <strong>' + this.field.extra_form_type + '</strong></div>' +
          '<div>Name: <strong>' + this.field.name + '</strong></div>'
      }
    },

    /**
     * Open the modal to save a configured field
     */
    openSaveModal: function() {
      this.modal.show = true;
    },

    /**
     * Close the modal to save a configured field
     */
    closeSaveModal: function() {
      this.modal.show = false;
      this.setInitialSaveModal();
    },

    /**
     * Transform a field to a type
     *
     * @param field Object
     * @returns type Object
     */
    transformFieldToType: function(field) {
      // We need to clone the fields, else changes are reflected on the fields
      var type = JSON.parse(JSON.stringify(field));
      type['extra_form_options'] = type['options'];
      delete type['options'];
      type['extra_form_constraints'] = type['constraints'];
      delete type['constraints'];
      type['form_type'] = type['extra_form_type'];
      delete type['extra_form_type'];

      return type;
    },

    /**
     * Save a configured type
     */
    saveConfiguredType: function(field) {
      var type = this.transformFieldToType(field);
      var url = this.$store.getters.postConfiguredExtraFormTypesApiUrl,
          body = {
            name: type.name,
            configuration: JSON.stringify(type)
          }
      ;
      this
        .$http.post(url, body)
        .then(
          function (response) {
            this.modal.type = 'success'
            this.modal.content = 'This field has been successfully saved';
            this.$store.commit('addConfiguredType', response.body);
          },
          function (response) {
            this.modal.type = 'put';
            this.modal.content = response.body + '. Do you want to update the configuration ?';
          }
        )
      ;
    },

    /**
     * Update a configured type
     */
    updateConfiguredType: function(field) {
      var type = this.transformFieldToType(field);
      var url = this.$store.getters.putConfiguredExtraForTypesApiUrl(type.name),
          body = { configuration: JSON.stringify(type) }
      ;
      this
        .$http.put(url, body)
        .then(
          function (response) {
            this.modal.type = 'success';
            this.modal.content = 'This field has been successfully updated';
            this.$store.commit('updateConfiguredType', response.body);
          },
          function (response) {
            this.modal.type = 'error';
            this.modal.content = response.body;
          }
        )
      ;
    },

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function(index) {
      this.$emit('removed', index);
    },

    /**
     * Tell the parent component that this field has been activated
     *
     * @param index
     */
    setActiveClass: function(index) {
      this.$emit('active-class', index);
    }
  }
};