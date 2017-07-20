<template>

  <div :class="activeClass" @click="setActiveClass(index)">
    <button @click.prevent="removeField(index)" aria-label="Close" class="close">
      <span aria-hidden="true">×</span>
    </button>
    <i class="fa fa-arrows-alt"></i>
    <i
      v-if="configuredTypesEditionAllowed"
      title="Save this field as a configured type"
      @click="openSaveModal" class="fa fa-floppy-o">
    </i>
    <strong>{{ field.extra_form_type }}</strong>
    <i :class="getFontAwsomeIconClass(field.icon, field.extra_form_type)" aria-hidden="true"></i><br>
    <span>
      Name:<input class="field-name-input" type="text" v-model="field.name" pattern="/^([a-z][0-9])+$/" />
    </span>
    <modal v-if="modal.show">
      <h3 slot="header">Save this configured field
        <button @click="closeSaveModal" type="button" class="close" aria-label="Close">&times;</button>
      </h3>
      <div v-if="modal.done" slot="body">
        <div v-html="modal.done"></div>
      </div>
      <div v-else slot="body">
        <div><i :class="getFontAwsomeIconClass(field.icon)" aria-hidden="true"></i></div>
        <div>Type: <strong>{{ field.extra_form_type }}</strong></div>
        <div>Name: <strong>{{ field.name }}</strong></div>
        <div>Tags: <input v-model="tags" type="text"></div>
      </div>
      <div slot="footer">
        <div v-if="modal.type == 'save'">
          <button @click="saveConfiguredType(field)" type="button" class="extra-btn" aria-label="Save">
            Save
          </button>
        </div>
        <div v-if="modal.type == 'put'">
          <button @click="updateConfiguredType(field)" type="button" class="extra-btn" aria-label="Save">
            Update
          </button>
        </div>
      </div>
    </modal>
  </div>

</template>

<script>

import fontAwesomeIconMixin from '../../mixins/icon.vue'
import rawMixin from '../../mixins/raw.vue'

export default {

  props: ['field', 'index'],

  data: function () {
    return {
      modal: null,
      tags: ''
    };
  },

  created: function () {
    this.setInitialSaveModal();
    this.initTags();
  },

  computed: {
    activeClass: function () {
      var active = this.field.active ? 'active' : 'inactive';

      return 'field ' + active;
    },
    configuredTypesEditionAllowed: function () {
      return this.$store.getters.configuredTypesEditionAllowed;
    }
  },

  mixins: [fontAwesomeIconMixin, rawMixin],

  methods: {

    /**
     * Init appropriate tags
     */
    initTags: function () {
      if (typeof this.field.tags !== 'undefined') {
        this.tags = this.field.tags;

        return;
      }

      var configuredExtraFormType = this.$store.getters.getConfiguredExtraFormType(this.field.name);

      if (typeof configuredExtraFormType !== 'undefined') {
        this.tags = configuredExtraFormType.tags;

        return;
      }

      this.tags = this.$store.getters.getConfiguredExtraFormTypesTags.filter(function (element) {
        return 0 !== element.indexOf('-');
      }).join(',');
    },

    /**
     * The the initial content and type of the save modal
     */
    setInitialSaveModal: function () {
      this.modal = {
        show: false,
        type: 'save'
      };
    },

    /**
     * Open the modal to save a configured field
     */
    openSaveModal: function () {
      this.modal.show = true;
    },

    /**
     * Close the modal to save a configured field
     */
    closeSaveModal: function () {
      this.modal.show = false;
      this.setInitialSaveModal();
    },

    /**
     * Transform a field to a type
     *
     * @param field Object
     * @returns type Object
     */
    transformFieldToType: function (field) {
      // We need to clone the fields, else changes are reflected on the fields
      var type = JSON.parse(JSON.stringify(field));

      type.extra_form_options = type.options;
      delete type.options;
      type.extra_form_constraints = type.constraints;
      delete type.constraints;
      type.form_type = type.extra_form_type;
      delete type.extra_form_type;

      return type;
    },

    /**
     * Save a configured type
     */
    saveConfiguredType: function (field) {
      var self = this;
      var name = field.name;
      var raw = this.createExtraFormRawRecursively([field]);
      var type = this.transformFieldToType(raw[field.name]);
      var url = this.$store.getters.postConfiguredExtraFormTypesApiUrl;
      var body = {
        name: name,
        tags: this.tags,
        configuration: JSON.stringify(type, null, 2)
      };

      this
        .$http.post(url, body)
        .then(
          function (response) {
            self.modal.type = 'success';
            self.modal.done = 'This field has been successfully saved';
            self.$store.commit('addConfiguredType', response.body);
          },
          function (response) {
            self.modal.type = 'put';
            self.modal.done = response.body + '. Do you want to update the configuration ?';
          }
        )
      ;
    },

    /**
     * Update a configured type
     */
    updateConfiguredType: function (field) {
      var self = this;
      var raw = this.createExtraFormRawRecursively([field]);
      var type = this.transformFieldToType(raw[field.name]);
      var url = this.$store.getters.putConfiguredExtraForTypesApiUrl(field.name);
      var body = {
        configuration: JSON.stringify(type, null, 2),
        tags: this.tags
      };

      this
        .$http.put(url, body)
        .then(
          function (response) {
            self.modal.type = 'success';
            self.modal.done = 'This field has been successfully updated';
            self.$store.commit('updateConfiguredType', response.body);
          },
          function (response) {
            self.modal.done = response.body;
          }
        )
      ;
    },

    /**
     * Remove a field
     *
     * @param index
     */
    removeField: function (index) {
      this.$emit('removed', index);
    },

    /**
     * Tell the parent component that this field has been activated
     *
     * @param index
     */
    setActiveClass: function (index) {
      this.$emit('active-class', index);
    }
  }
};

</script>
