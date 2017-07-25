<template>

  <div>
    <button @click="createConfiguredField(type)" class="extra-btn" type="button" :class="type.name">
      <i :class="getFontAwsomeIconClass(type.icon)" aria-hidden="true"></i>
      <span>{{ type.name }}</span>
      <i v-if="configuredTypesEditionAllowed" class="fa fa-trash delete" @click.stop="openDeleteModal"></i>
    </button>
    <modal v-if="modal.show">
      <h3 slot="header">Delete this configured field
        <button @click="closeDeleteModal" type="button" class="close" aria-label="Close">&times;</button>
      </h3>
      <div slot="body" v-html="modal.content"></div>
      <div slot="footer">
        <button @click="deleteConfiguredType(type)" type="button" class="extra-btn" aria-label="Save">
          Delete
        </button>
      </div>
    </modal>
  </div>

</template>

<script>

import fontAwesomeIconMixin from 'ExtraFormBundle/mixins/icon.vue'

export default {

  props: ['type'],

  data: function () {
    return {
      modal: {
        show: false,
        content:
          '<div><i class="' + this.getFontAwsomeIconClass(this.type.icon) + '" aria-hidden="true"></i></div>' +
          '<div>Type: <strong>' + this.type.form_type + '</strong></div>' +
          '<div>Name: <strong>' + this.type.name + '</strong></div>'
      }
    };
  },

  computed: {
    configuredTypesEditionAllowed: function () {
      return this.$store.getters.configuredTypesEditionAllowed;
    }
  },

  mixins: [fontAwesomeIconMixin],

  methods: {

    /**
     * Open the modal to delete a configured field
     */
    openDeleteModal: function () {
      this.modal.show = true;
    },

    /**
     * Close the modal to delete a configured field
     */
    closeDeleteModal: function () {
      this.modal.show = false;
    },

    /**
     * Delete a configured type
     */
    deleteConfiguredType: function (type) {
      this.$emit('delete', type);
    },

    /**
     * Create a new configured field
     */
    createConfiguredField: function (type) {
      this.$emit('created', type);
    }
  }

};

</script>
