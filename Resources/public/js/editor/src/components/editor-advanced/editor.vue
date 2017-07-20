<template>

  <div class="editor-advanced editor row">
    <extra-form-types @created="addField" class="extra-form-types col-md-3 col-lg-3"></extra-form-types>
    <extra-form-fields :fields="fields" class="extra-form-fields col-md-4 col-lg-3"></extra-form-fields>
    <extra-form-fields-configuration
      :fields="fields"
      class="extra-form-fields-configuration col-md-5 col-lg-6"
    ></extra-form-fields-configuration>
  </div>

</template>

<script>

import extraFormTypes from './extra-form-types.vue';
import extraFormFields from './extra-form-fields.vue';
import extraFormFieldsConfiguration from './extra-form-fields-configuration.vue';

export default {

  props: ['fields'],

  components: {
    'extra-form-types': extraFormTypes,
    'extra-form-fields': extraFormFields,
    'extra-form-fields-configuration': extraFormFieldsConfiguration
  },

  methods: {

    /**
     * Add a new field
     *
     * @param field
     */
    addField: function (field) {
      this.resetActiveClasses();
      field.active = true;
      this.fields.push(field);
    },

    resetActiveClasses: function () {
      for (var i = 0, len = this.fields.length; i < len; i++) {
        this.$set(this.fields[i], 'active', false);
      }
    }
  }

};

</script>

<style>

.editor-modal.overview-modal {
    z-index: 9999;
}

.editor-modal.overview-modal .modal-content {
    max-height: 93vh;
    top: 20%;
    overflow: auto;
}

.editor-advanced > div {
    max-height: 80vh;
    min-height: 60vh;
    overflow: auto;
}

.editor-advanced i.delete {
    float: right;
    padding-left: 5px;
    position: relative;
    top: 3px;
}

/** EXTRA FORM FIELDS **/

.editor-advanced .extra-form-fields .field {
    background-color: white;
    border: 1px solid #514D61;
    color: #514D61;
    cursor: pointer;
    margin: 10px;
    padding: 10px;
}

.editor-advanced .extra-form-fields .field.active {
    background-color: #514D61;
    color: #FFFFFF;
}

.editor-advanced .extra-form-fields .field button.close {
    color: #514D61;
    opacity: 1;
    visibility: hidden;
}

.editor-advanced .extra-form-fields .field.active button.close {
    color: #FFFFFF;
}

.editor-advanced .extra-form-fields .field button.close:hover {
    opacity: 0.7;
}

.editor-advanced .extra-form-fields .field strong {
    display: inline-block;
    padding-bottom: 5px;
}

.editor-advanced .extra-form-fields .field .fa-icon,
.editor-advanced .vue-modal-container .fa-icon {
    float: left;
    font-size: 25px;
    margin: 10px 10px 30px 5px;
}

.editor-advanced .extra-form-fields .field .fa-arrows-alt,
.editor-advanced .extra-form-fields .field .fa-floppy-o {
    float: right;
    font-size: 20px;
    line-height: 1;
    position: relative;
    right: 15px;
    top: 10px;
}

.editor-advanced .extra-form-fields .field .fa-floppy-o {
    right: 30px;
}

.editor-advanced .extra-form-fields .field .fa-floppy-o:hover {
    color: #A0809D;
}

.editor-advanced .extra-form-fields .field .fa-arrows-alt:hover {
    cursor: move;
}

.editor-advanced .extra-form-fields .field:hover button.close {
    visibility: visible;
}

/** EXTRA FORM FIELDS CONFIGURATION **/

.editor-advanced .field.active .field-name-input {
    color: #FFFFFF;
}

.editor-advanced .field .field-name-input {
    background-color: transparent;
    border: none;
    color: #514D61;
    padding-left: 5px;
    width: 200px;
}

.editor-advanced .extra-form-fields-configuration > .inactive {
    display: none;
}

.editor-advanced .extra-form-fields-configuration > .active {
    display: block;
}

/* Do not display the label (used in the editor-simple component) */
.editor-advanced .tab-content > .tab-pane > div > label {
    display: none;
}

/** EXTRA FORM FIELDS CONFIGURATION : OPTIONS **/

.editor-advanced .field-options > div > button.extra-btn {
    margin: 0;
    padding: 5px;
}

/** EXTRA FORM FIELDS CONFIGURATION : CONSTRAINTS **/

.editor-advanced .extra-form-fields-configuration .new-field-constraint button {
    display: inline-block;
    margin: 0 10px;
    min-width: inherit;
    padding: 8px;
}

</style>
