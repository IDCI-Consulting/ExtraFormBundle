/* exported editorSimpleNewFieldConstraint */
var editorSimpleNewFieldConstraint = {

  template:
    '<div>' +
      '<select class="new-field-constraint" v-model="selectedConstraint">' +
        '<option v-for="(constraint, key) in constraints" :value="key">' +
          '{{ constraint.description }}' +
        '</option>' +
      '</select> ' +
      '<button @click.prevent="createConstraint">New constraint</button>' +
    '</div>'
  ,

  data: function () {
    return {
      constraints: [],
      selectedConstraint: 'initial'
    }
  },

  created: function() {
    this.getExtraFormConstraints();
  },

  /* global httpMixin */
  mixins: [httpMixin],

  methods: {

    /**
     * Create a new constraint
     */
    createConstraint: function() {
      var constraint = {
        'extra_form_constraint': this.selectedConstraint,
        'options': {}
      };

      this.$emit('created', constraint);
    },

    /**
     * Get the extra form constraints
     */
    getExtraFormConstraints: function() {
      var url = this.$store.getters.extraFormConstraintsApiUrl,
          self = this
      ;

      this.handleGetRequest(url, function (json) {
        self.constraints = json;
        self.selectedConstraint = Object.keys(self.constraints)[0];
      });
    }
  }
};