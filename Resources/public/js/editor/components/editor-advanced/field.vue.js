var editorAdvancedField = {

  template:
    '<div :class="classes" @click="setActiveClass(index)">' +
      '<button @click.prevent="removeField(index)" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>' +
      '<i class="icon-move"></i>' +
      '<strong>{{ field.extra_form_type }}</strong><br>' +
      '<span>Name: <input class="field-name-input" type="text" v-model="field.name" /></span>' +
    '</div>'
  ,

  props: ['field', 'index'],

  computed: {
    classes: function(){
      var active = this.field.active ? 'active' : 'inactive';

      return 'field ' + active;
    }
  },

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