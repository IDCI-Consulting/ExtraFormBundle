/**
 * @see https://vuejs.org/v2/guide/components.html#Form-Input-Components-using-Custom-Events
 */
var typesSelectbox = {

  template:
    '<select v-bind:value="value" v-on:change="updateValue($event.target.value)" v-model="selected">' +
      '<option v-for="type in types" :value="type.form_type">' +
        '{{ type.form_type }}' +
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
      this.$http
        .get(this.$store.getters.extraFormTypesApiUrl)
        .then(
          function(response) {
            return response.json();
          },
          function (response) {
            console.log(response.status + ' ' + response.statusText);
          }
        )
        .then(function (jsonTypes) {
          jsonTypes = filterObject(jsonTypes, function(element) {
            return element.abstract === false;
          });

          this.types = jsonTypes;
          if (this.selected === 'initial') {
            this.selected = Object.keys(this.types)[0];
          }

          this.$emit('input', this.selected)
        })
      ;
    }

  }
};