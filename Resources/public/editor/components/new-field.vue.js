var newField = {

  delimiters: ['${', '}'],

  template:
    '<div>' +
      '<types-selectbox v-model="selectedExtraFormType"/>' +
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
     *
     * @param event
     */
    createField: function() {
      var field = {
        'name': 'field_' + this.selectedExtraFormType + '_' + this.generateUniqueId(),
        'extra_form_type': this.selectedExtraFormType,
        'options': {},
        'constraints': []
      };

      this.$emit('created', field);
    },

    /**
     * Generate a unique id for the fields default names
     *
     * @returns string
     */
    generateUniqueId: function() {
      return Math.random().toString(36).substr(2, 9);
    }
  }
};