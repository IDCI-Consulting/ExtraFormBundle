var extraFormFields = {

  template:
      '<div>' +
          '<draggable :list="fields" :options="sortableOptions">' +
              '<field @active-class="setActiveClass" @removed="removeField" v-for="(field, index) in fields" :field="field" :index="index"/>' +
          '</draggable>' +
      '</div>'
  ,

  props: ['fields'],

  data: function() {
    return {
      'sortableOptions': {
        handle: '.fa-arrows-alt'
      }
    };
  },

  components: {
    'field': editorAdvancedField
  },

  methods: {

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function(index) {
      this.fields.splice(index, 1);
    },

    /**
     * Set the class active on the field
     *
     * @param index
     */
    setActiveClass: function(index) {
      this.resetActiveClasses();
      this.$set(this.fields[index], 'active', true);
    },

    /**
     * Reset all active classes
     */
    resetActiveClasses: function() {
      for (var i= 0, len = this.fields.length; i < len; i++) {
        this.$set(this.fields[i], 'active', false);
      }
    }
  }

};