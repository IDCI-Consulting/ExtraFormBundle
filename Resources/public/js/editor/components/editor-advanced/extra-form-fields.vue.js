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
        handle: '.icon-move'
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
     * Remove a field
     *
     * @param index
     */
    setActiveClass: function(index) {
      this.resetActiveClasses();
      this.$set(this.fields[index], 'active', true);
    },

    resetActiveClasses: function() {
      for (var i= 0, len = this.fields.length; i < len; i++) {
        this.$set(this.fields[i], 'active', false);
      }
    }
  }

};