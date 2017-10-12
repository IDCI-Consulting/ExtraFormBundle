<template>

  <div>
    <button class="extra-btn" @click="createField(type)" type="button">
      <i :class="getFontAwsomeIconClass(type.icon)" aria-hidden="true"></i>
      {{ type.form_type_name }}
    </button>
  </div>

</template>

<script>

import fontAwesomeIconMixin from 'ExtraFormBundle/mixins/icon.vue'

export default {

  props: ['type'],

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

</script>
