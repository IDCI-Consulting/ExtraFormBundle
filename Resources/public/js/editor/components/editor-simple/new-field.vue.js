var editorSimpleNewField = {

  template:
      '<div>' +
          '<types-selectbox v-model="selectedExtraFormType"/> ' +
          '<button @click.prevent="createField">New field</button>' +
      '</div>'
  ,

  data: function () {
    return {
      selectedExtraFormType: 'initial'
    }
  },

  components: {
    'types-selectbox': typesSelectbox
  },

  methods: {

    /**
     * Create a new field
     */
    createField: function() {
      var field = {
        'name': 'field_' + this.selectedExtraFormType + '_' + generateUniqueId(),
        'extra_form_type': this.selectedExtraFormType,
        'options': {},
        'constraints': []
      };

      this.$emit('created', field);
    }
  }
};