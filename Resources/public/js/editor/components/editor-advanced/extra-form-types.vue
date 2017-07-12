<template>

  <div>
    <div>
      <ul v-if="showConfiguredTypes" class="nav nav-pills" role="tablist">
        <li role="presentation" class="active">
          <a role="tab" data-toggle="tab" :href="anchor('#', 'basic_types')">Base types</a>
        </li>
        <li role="presentation">
          <a role="tab" data-toggle="tab" :href="anchor('#', 'configured_types')">Configured types</a>
        </li>
      </ul>
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane in active" :id="anchor('', 'basic_types')">
          <base-extra-form-type
            @created="createField"
            :type="baseType"
            v-for="baseType in baseTypes"
            :key="baseType"
          >
          </base-extra-form-type>
        </div>
        <div role="tabpanel" class="tab-pane" :id="anchor('', 'configured_types')">
          <configured-extra-form-type
            @delete="deleteConfiguredType"
            @created="createConfiguredField"
            :type="configuredType"
            v-for="configuredType in configuredTypes"
            :key="configuredType"
          >
          </configured-extra-form-type>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {generateUniqueId} from '../../utils/utils.js';
import baseExtraFormType from './base-extra-form-type.vue';
import configuredExtraFormType from './configured-extra-form-type.vue';
import rawMixin from '../../mixins/raw.vue';

export default {

  data: function () {
    return {
      modal: {
        show: false
      },
      editorId: this.$store.getters.editorId
    };
  },

  computed: {
    configuredTypes: function () {
      return this.$store.getters.getConfiguredExtraFormTypes;
    },
    showConfiguredTypes: function () {
      return this.$store.getters.showConfiguredTypes;
    },
    baseTypes: function () {
      return this.$store.getters.getBaseExtraFormTypes;
    }
  },

  components: {
    'configured-extra-form-type': configuredExtraFormType,
    'base-extra-form-type': baseExtraFormType
  },

  mixins: [rawMixin],

  methods: {

    /**
     * Create an anchor to hook on bootstrap tab feature
     *
     * @param prefix
     * @param name
     *
     * @returns {string}
     */
    anchor: function (prefix, name) {
      return prefix + name + '_' + this.editorId;
    },

    /**
     * Create a new field
     */
    createField: function (type) {
      var field = {
        name: 'field_' + type.name + '_' + generateUniqueId(),
        icon: type.icon,
        extra_form_type: type.name,
        options: {},
        constraints: []
      };

      this.$emit('created', field);
    },

    /**
     * Delete a configured type
     */
    deleteConfiguredType: function (type) {
      var self = this;
      this
        .$http.delete(this.$store.getters.deleteConfiguredExtraForTypesApiUrl(type.name))
        .then(
          function () {
            // Delete the type from the configured types
            for (var i = 0, len = this.configuredTypes.length; i < len; i++) {
              if (this.configuredTypes[i].name === type.name) {
                self.$store.commit('removeConfiguredType', i);

                // Avoid too keep looping over a sliced array
                return;
              }
            }
          }
        )
      ;
    },

    /**
     * Create a new configured field
     */
    createConfiguredField: function (type) {
      var options = {};

      for (var optionName in type.extra_form_options) {
        if (type.extra_form_options.hasOwnProperty(optionName)) {
          if ('undefined' !== typeof type.extra_form_options[optionName].options.data) {
            options[optionName] = type.extra_form_options[optionName].options.data;
          }
        }
      }

      var field = {
        name: type.name,
        icon: type.icon,
        tags: type.tags,
        extra_form_type: type.form_type_name,
        options: options,
        constraints: type.extra_form_constraints
      };

      /* Case where the fields contains an extra form builder
      with a configuration option that contains fields, and so on and so on */
      if ('undefined' !== typeof field.options.configuration) {
        field.options.configuration = this.createFieldsRecursively(JSON.parse(field.options.configuration));
      }

      this.$emit('created', field);
    }

  }

};

</script>
