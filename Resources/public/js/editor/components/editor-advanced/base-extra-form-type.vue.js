/* exported baseExtraFormType */
var baseExtraFormType = {

  template:
    '<div>' +
      '<button class="extra-btn" @click="createField(type)" type="button">' +
        '<i :class="getFontAwsomeIconClass(type.icon)" aria-hidden="true"></i>' +
        '{{ type.name }}' +
      '</button>' +
    '</div>',

  props: ['type'],

  /* global fontAwesomeIconMixin */
  mixins: [fontAwesomeIconMixin],

  methods: {

    /**
     * Create a new configured field
     */
    createField: function (type) {
      this.$emit('created', type);
    }
  }

};
