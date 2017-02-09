var editorAdvancedNewFieldConstraint = {

  template:
      '<div class="new-field-constraint">' +
          '<multiselect v-model="selectedConstraint" :options="constraints" label="description" key="name" selectLabel="" placeholder="Select a constraint"></multiselect>' +
          '<button class="extra-btn" @click.prevent="createConstraint">Add</button>' +
      '</div>'
  ,

  data: function () {
    return {
      constraints: [],
      selectedConstraint: 'initial'
    }
  },

  mounted: function() {
    this.getExtraFormConstraints();
  },

  methods: {

    /**
     * Create a new constraint
     */
    createConstraint: function() {
      var constraint = {
        'extra_form_constraint': this.selectedConstraint.name,
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
          this.constraints = Object.keys(response.body).map(function (key) {
            var element = response.body[key];
            element.name = key;
            return element;
          });
          this.selectedConstraint = this.constraints[0];
        },
        function (response) {
          console.log(response.status + ' ' + response.statusText);
        }
      )
      ;
    }
  }
};