/* exported editorAdvancedNewFieldConstraint */
var editorAdvancedNewFieldConstraint = {

  template:
    '<div class="new-field-constraint">' +
      '<multiselect v-model="selectedConstraint" :options="constraints" label="description" key="name" selectLabel="" placeholder="Select a constraint"></multiselect>' +
      '<button class="extra-btn" @click.prevent="createConstraint">Add</button>' +
    '</div>'
  ,

  mixins: [httpMixin],

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
        'extra_form_constraint': this.selectedConstraint.name,
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
        // set the key of the objects as the value of the name so we can use it over iteration
        self.constraints = Object.keys(json).map(function (key) {
          var element = json[key];
          element.name = key;
          return element;
        });

        self.selectedConstraint = self.constraints[0];
      });
    }

  }
};