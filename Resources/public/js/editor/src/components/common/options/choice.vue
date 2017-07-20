<template>

  <div class="form-group">
    <label :for="name">{{ name }}</label>
    <div class="form-control-wrapper">
      <span v-if="option.options.help">{{ option.options.help }}</span>
      <select
        class="form-control"
        :required="option.options.required"
        v-model="data"
        :name="name"
      >
        <option :value="key" v-for="(choice, key) in option.options.choices">{{ choice }}</option>
      </select>
    </div>
  </div>

</template>

<script>

import optionMixin from '../../../mixins/option.vue';

export default {

  mixins: [optionMixin],

  /**
   * Update the selected value when the value updates
   */
  watch: {
    value: {
      handler: function (newValue) {
        this.data = newValue;
      },
      deep: true
    },
    data: {
      handler: function (newValue) {
        this.updateOption(newValue);
      },
      deep: true
    }
  }

};

</script>
