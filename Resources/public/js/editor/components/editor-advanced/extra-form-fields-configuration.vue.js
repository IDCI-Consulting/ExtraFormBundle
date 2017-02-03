var extraFormFieldsConfiguration = {

  template:
  '<div>' +
      '<div v-for="(field, index) in fields" :class="field.active ? \'active\' : \'inactive\'">' +
          '<ul class="nav nav-pills" role="tablist">' +
              '<li role="presentation" class="active">' +
                  '<a role="tab" data-toggle="tab" :href="anchor(\'#\', field.name, \'options\')">Options</a>' +
              '</li>' +
              '<li role="presentation">'+
                  '<a role="tab" data-toggle="tab" :href="anchor(\'#\', field.name, \'constraints\')">Constraints</a>' +
              '</li>' +
          '</ul>' +
          '<div class="tab-content">' +
              '<div role="tabpanel" class="tab-pane in active" :id="anchor(\'\', field.name, \'options\')">' +
                  '<field-options class="field-options" :fieldOptions="field.options" :type="field.extra_form_type"></field-options>' +
              '</div>' +
              '<div role="tabpanel" class="tab-pane" :id="anchor(\'\', field.name, \'constraints\')">' +
                  '<field-constraints class="field-constraints"></field-constraints>' +
              '</div>' +
          '</div>' +
      '</div>' +
  '</div>'
  ,

  props: ['fields'],

  components: {
    'field-options': editorSimpleFieldOptions,
    'field-constraints': editorSimpleFieldConstraints
  },

  methods: {
    anchor: function(prefix, name, type) {
      return prefix + name + '_' + type;
    }
  }

};