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
      this.$http.get(this.$store.getters.extraFormConstraintsApiUrl)
        .then(
        function(response) {
          this.constraints = response.body;
          this.selectedConstraint = Object.keys(this.constraints)[0];
        },
        function (response) {
          console.log(response.status + ' ' + response.statusText);
        }
      )
      ;
    }
  }
};