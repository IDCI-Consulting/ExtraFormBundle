/* exported editorAdvancedFieldOptions */
/* global generateUniqueId */
/* global $ */

var editorAdvancedFieldOptions = {

  template:
    '<div>' +
      '<label>Options : </label>' +
        '<component ' +
          'v-if="option.component_name !== \'editor\'" ' +
          ':is="option.component_name" ' +
          'v-for="(option, key) in options" ' +
          ':option="option" ' +
          ':name="key" ' +
          ':value="fieldOptions[key]" ' +
          '@changed="updateOption">' +
        '</component>' +
        '<div v-for="(option, key) in options" v-if="option.component_name === \'editor\'">' +
          '<button :id="id" class="extra-btn" @click.prevent="triggerModal">' +
            'Add fields for this "sub" extra form' +
          '</button> ' +
          '<div class="modal fade modal-fullscreen" :id="\'modal_\' + id">' +
            '<div class="modal-dialog" role="document">' +
              '<div class="modal-content">' +
                '<div class="modal-header">' +
                  '<button type="button" class="close" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                  '</button>' +
                  '<h4 class="modal-title">Advanced visual mode</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                  '<editor-advanced :fields="fieldOptions[key]"></editor-advanced>' +
                '</div>' +
                '<div class="modal-footer">' +
                  '<button class="btn btn-default close-modal">' +
                    'Go back to the parent editor <i class="fa fa-times"></i>' +
                  '</button>' +
                  '<em>All your changes are automatically saved</em>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
      '</div>' +
    '</div>',

  props: ['type', 'fieldOptions'],

  data: function () {
    return {
      options: {}
    };
  },

  computed: {
    id: function () {
      return generateUniqueId();
    }
  },

  components: {

    /* global checkboxOption */
    'option-checkbox': checkboxOption,

    /* global textareaOption */
    'option-textarea': textareaOption,

    /* global choiceOption */
    'option-choice': choiceOption,

    /* global textOption */
    'option-text': textOption,

    /* global numberOption */
    'option-number': numberOption,

    /* global integerOption */
    'option-integer': integerOption
  },

  /* global httpMixin */
  mixins: [httpMixin],

  created: function () {
    this.getExtraFormTypeOptions(this.type);
  },

  watch: {
    type: {
      handler: function (newType) {
        this.getExtraFormTypeOptions(newType);
      }
    }
  },

  methods: {

    /**
     * Trigger a modal
     *
     * @param event
     */
    triggerModal: function (event) {
      var $button = $(event.target);
      var $modal = $button
        .siblings('#modal_' + event.target.id)
        .first();

      $modal.modal('show');
      $modal.find('.close').on('click', function (e) {
        e.preventDefault();
        $(this)
          .closest('.modal')
          .modal('hide')
        ;
      });
    },

    /**
     * Update an option
     *
     * @param option
     */
    updateOption: function (option) {
      this.$set(this.fieldOptions, option.name, option.value);
    },

    /**
     * Get the form type options
     *
     * @param type
     */
    getExtraFormTypeOptions: function (type) {
      var url = this.$store.getters.extraFormTypeOptionsApiUrl(type);
      var self = this;

      this.handleGetRequest(url, function (options) {
        for (var option in options) {
          if (options.hasOwnProperty(option)) {
            if ('configuration' === option) {
              options[option].component_name = 'editor';
              if ('undefined' === typeof self.fieldOptions[option]) {
                // Initialize the configuration fields for the first time
                self.$set(self.fieldOptions, option, []);
              }
            } else {
              options[option].component_name = 'option-' + options[option].extra_form_type;
            }
          }
        }

        self.options = options;
      });
    }
  }
};
