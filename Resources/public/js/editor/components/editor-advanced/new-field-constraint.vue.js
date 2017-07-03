
import httpMixin from '../../mixins/http.vue.js';
import Multiselect from 'vue-multiselect';

export default {

  template:
    '<div class="new-field-constraint">' +
      '<multiselect ' +
        'v-model="selectedConstraint" ' +
        ':options="constraints" ' +
        'label="description" ' +
        'key="name" ' +
        'selectLabel="" ' +
        'placeholder="Select a constraint">' +
      '</multiselect>' +
      '<button class="extra-btn" @click.prevent="createConstraint">Add</button>' +
    '</div>',

  mixins: [httpMixin],

  data: function () {
    return {
      constraints: [],
      selectedConstraint: 'initial'
    };
  },

  created: function () {
    this.getExtraFormConstraints();
  },

  methods: {

    /**
     * Create a new constraint
     */
    createConstraint: function () {
      var constraint = {
        extra_form_constraint: this.selectedConstraint.name,
        options: {}
      };

      this.$emit('created', constraint);
    },

    /**
     * Get the extra form constraints
     */
    getExtraFormConstraints: function () {
      var url = this.$store.getters.getExtraFormConstraintsApiUrl;
      var self = this;

      this.handleGetRequest(url, function (json) {
        // Set the key of the objects as the value of the name so we can use it over iteration
        self.constraints = Object.keys(json).map(function (key) {
          json[key].name = key;

          return json[key];
        });

        self.selectedConstraint = self.constraints[0];
      });
    }

  }
};
