/**
 * @see https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
 */
var typesSelectbox = {

  template:
    '<select v-bind:value="value" v-on:change="updateValue($event.target.value)" v-model="selected">' +
      '<option v-for="(type, typeName) in types" :value="typeName">' +
        '{{ typeName }}' +
      '</option>' +
    '</select>'
  ,

  props: ['value'],

  data: function () {
    return {
      selected: this.value,
      types: []
    }
  },

  mixins: [httpMixin],

  mounted: function() {
    this.getExtraFormTypes();
  },

  watch: {
    value: {
      handler: function(value) {
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
    getExtraFormTypes: function() {
      var url = this.$store.getters.extraFormTypesApiUrl,
          self = this
      ;

      this.handleGetRequest(url, function (json) {
        self.types = filterObject(json, function (element) {
          return element.abstract === false;
        });

        if (self.selected === 'initial') {
          self.selected = Object.keys(self.types)[0];
        }

        self.$emit('input', self.selected)
      });
    }

  }
};