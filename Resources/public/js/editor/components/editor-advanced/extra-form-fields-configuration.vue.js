
import editorAdvancedFieldOptions from './field-options.vue.js';
import editorAdvancedFieldConstraints from './field-constraints.vue.js';
import editorAdvancedNewFieldConstraint from './new-field-constraint.vue.js';

export default {

  template:
    '<div>' +
      '<div v-for="(field, index) in fields" :class="field.active ? \'active\' : \'inactive\'">' +
        '<ul class="nav nav-pills" role="tablist">' +
          '<li role="presentation" class="active">' +
            '<a role="tab" data-toggle="tab" :href="anchor(\'#\', field.name, \'options\')">Options</a>' +
          '</li>' +
          '<li role="presentation">' +
            '<a role="tab" data-toggle="tab" :href="anchor(\'#\', field.name, \'constraints\')">Constraints</a>' +
          '</li>' +
        '</ul>' +
        '<div class="tab-content">' +
          '<div role="tabpanel" class="tab-pane in active" :id="anchor(\'\', field.name, \'options\')">' +
            '<field-options class="field-options" :fieldOptions="field.options" :type="field.extra_form_type">' +
            '</field-options>' +
          '</div>' +
          '<div role="tabpanel" class="tab-pane" :id="anchor(\'\', field.name, \'constraints\')">' +
            '<new-field-constraint @created="addConstraint($event, index)"/><br>' +
            '<field-constraints :fieldConstraints="field.constraints" class="field-constraints"></field-constraints>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>',

  props: ['fields'],

  components: {
    'field-options': editorAdvancedFieldOptions,
    'field-constraints': editorAdvancedFieldConstraints,
    'new-field-constraint': editorAdvancedNewFieldConstraint
  },

  methods: {

    /**
     * Create an anchor to hook on bootstrap pills feature
     *
     * @param prefix
     * @param name
     * @param type
     * @returns {string}
     */
    anchor: function (prefix, name, type) {
      return prefix + name + '_' + type;
    },

    /**
     * Add a new constraint to the field
     */
    addConstraint: function (newConstraint, index) {
      this.fields[index].constraints.push(newConstraint);
    }
  }

};
