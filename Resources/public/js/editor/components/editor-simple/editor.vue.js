/* global Vue */
Vue.component('form-editor-simple', {

  template:
    '<div class="editor-simple">' +
      '<draggable :list="fields" :options="sortableOptions">' +
        '<field class="field" @removed="removeField" v-for="(field, index) in fields" :field="field" :index="index"/>' +
      '</draggable>' +
      '<new-field class="new-field" @created="addField"></new-field>' +
    '</div>',

  props: ['fields'],

  data: function () {
    return {
      sortableOptions: {
        handle: '.handle'
      }
    };
  },

  components: {

    /* global editorSimpleNewField */
    'new-field': editorSimpleNewField,

    /* global editorSimpleField */
    'field': editorSimpleField
  },

  methods: {

    /**
     * Add a new field
     *
     * @param field
     */
    addField: function (field) {
      this.fields.push(field);
    },

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function (index) {
      this.fields.splice(index, 1);
    }

  }

});
