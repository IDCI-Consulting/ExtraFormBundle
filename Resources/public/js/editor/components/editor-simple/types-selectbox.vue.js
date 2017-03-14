/**
 * @see https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
 */
/* exported typesSelectbox */
var typesSelectbox = {

  template:
    '<select v-bind:value="value" v-on:change="updateValue($event.target.value)" v-model="selected">' +
      '<option v-for="type in types" :value="type.name">' +
        '{{ type.name }}' +
      '</option>' +
    '</select>',

  props: ['value'],

  data: function () {
    return {
      selected: this.value,
      types: []
    };
  },

  /* global httpMixin */
  mixins: [httpMixin],

  mounted: function () {
    this.getExtraFormTypes();
  },

  watch: {
    value: {
      handler: function (value) {
        this.selected = value;
      }
    }
  },

  methods: {

    updateValue: function (selectedExtraFormType) {
      this.$emit('input', selectedExtraFormType);
    },

    /**
     * Get the form types
     */
    getExtraFormTypes: function () {
      var url = this.$store.getters.getExtraFormTypesApiUrl;
      var self = this;

      this.handleGetRequest(url, function (json) {
        self.types = json.filter(function (element) {
          return false === element.abstract;
        });

        if ('initial' === self.selected) {
          self.selected = self.types[0].name;
        }

        self.$emit('input', self.selected);
      });
    }

  }
};
