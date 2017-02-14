var editorAdvancedField = {

  template:
      '<div :class="activeClass" @click="setActiveClass(index)">' +
          '<button @click.prevent="removeField(index)" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' +
          '<i class="fa fa-arrows-alt"></i>' +
          '<i title="Save this field as a configured type" @click="openSaveModal" class="fa fa-floppy-o"></i>' +
          '<strong>{{ field.extra_form_type }}</strong><i :class="getFontAwsomeIconClass(field.icon)" aria-hidden="true"></i><br>' +
          '<span>Name: <input class="field-name-input" type="text" v-model="field.name" /></span>' +

          '<modal v-if="showModal" @close="showModal = false">' +
              '<h3 slot="header">Save this configured field</h3>' +
              '<div slot="body">' +
                  '<div>Type: {{ field.extra_form_type }}</div>' +
                  '<div>Name: {{ field.name }}</div>' +
              '</div>' +
          '</modal>' +
      '</div>'
  ,

  props: ['field', 'index'],

  data: function() {
    return {
      showModal: false,
      selectedIcon: ''
    }
  },

  computed: {
    activeClass: function() {
      var active = this.field.active ? 'active' : 'inactive';

      return 'field ' + active;
    }
  },

  mixins: [fontAwesomeIconMixin],

  watch: {
    field: {
      handler: function(field) {
        var active = field.active ? 'active' : 'inactive';
        this.classes = 'field ' + active;
      },
      deep: true
    }
  },

  methods: {

    /**
     * Open a modal to save a configured field
     */
    openSaveModal: function() {
      this.showModal = true;
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